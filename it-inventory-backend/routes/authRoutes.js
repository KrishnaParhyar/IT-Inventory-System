const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, body, validationResult } = require('express-validator');

module.exports = (pool) => {
  // @route   GET /api/auth/test
  // @desc    Test authentication route
  // @access  Public
  router.get('/test', (req, res) => {
    res.json({ 
      status: 'success',
      message: 'Authentication API is working',
      timestamp: new Date().toISOString()
    });
  });

  // @route   POST /api/auth/signup
  // @desc    Register a new user
  // @access  Public
  router.post(
    '/signup',
    [
      body('name')
        .trim()
        .escape()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 255 }).withMessage('Name cannot exceed 255 characters'),
      
      body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please provide a valid email')
        .isLength({ max: 255 }).withMessage('Email cannot exceed 255 characters'),
      
      body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/\d/).withMessage('Password must contain a number')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[^A-Za-z0-9]/).withMessage('Password must contain a special character'),
      
      body('role')
        .optional()
        .isIn(['admin', 'operator', 'management']).withMessage('Invalid role specified')
    ],
    async (req, res) => {
      try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: 'error',
            errors: errors.array(),
            timestamp: new Date().toISOString()
          });
        }

        const { name, email, password, role = 'admin' } = req.body;

        // Check if user exists
        const [users] = await pool.query(
          'SELECT id FROM users WHERE email = ? LIMIT 1', 
          [email]
        );

        if (users.length > 0) {
          return res.status(409).json({
            status: 'error',
            message: 'User already exists',
            timestamp: new Date().toISOString()
          });
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const [result] = await pool.query(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          [name, email, hashedPassword, role]
        );

        // Generate JWT
        const payload = {
          user: {
            id: result.insertId,
            role: role
          }
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
            issuer: 'your-app-name',
            audience: 'your-client-name'
          },
          (err, token) => {
            if (err) {
              console.error('JWT generation error:', err);
              throw err;
            }
            
            res.status(201).json({
              status: 'success',
              token,
              user: {
                id: result.insertId,
                name,
                email,
                role
              },
              timestamp: new Date().toISOString()
            });
          }
        );
      } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined,
          timestamp: new Date().toISOString()
        });
      }
    }
  );

  // @route   POST /api/auth/login
  // @desc    Authenticate user
  // @access  Public
  router.post(
    '/login',
    [
      body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please provide a valid email'),
      
      body('password')
        .notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
      try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: 'error',
            errors: errors.array(),
            timestamp: new Date().toISOString()
          });
        }

        const { email, password } = req.body;

        // Check if user exists
        const [users] = await pool.query(
          'SELECT * FROM users WHERE email = ? LIMIT 1',
          [email]
        );

        if (users.length === 0) {
          return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials',
            timestamp: new Date().toISOString()
          });
        }

        const user = users[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials',
            timestamp: new Date().toISOString()
          });
        }

        // Generate JWT
        const payload = {
          user: {
            id: user.id,
            role: user.role
          }
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
            issuer: 'your-app-name',
            audience: 'your-client-name'
          },
          (err, token) => {
            if (err) {
              console.error('JWT generation error:', err);
              throw err;
            }
            
            res.json({
              status: 'success',
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
              },
              timestamp: new Date().toISOString()
            });
          }
        );
      } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined,
          timestamp: new Date().toISOString()
        });
      }
    }
  );

  // In-memory OTP store (for demo only, use DB in production)
  const otpStore = {};

  // @route   POST /api/auth/send-otp
  // @desc    Send OTP to user's email for password reset
  // @access  Public
  router.post(
    '/send-otp',
    [
      body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please provide a valid email')
    ],
    async (req, res) => {
      try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: 'error',
            errors: errors.array(),
            timestamp: new Date().toISOString()
          });
        }

        const { email } = req.body;

        // Check if user exists
        const [users] = await pool.query(
          'SELECT id, name FROM users WHERE email = ? LIMIT 1',
          [email]
        );
        if (users.length === 0) {
          return res.status(404).json({
            status: 'error',
            message: 'User with this email does not exist',
            timestamp: new Date().toISOString()
          });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = {
          otp,
          expires: Date.now() + 10 * 60 * 1000 // 10 minutes
        };

        // For demo: Print OTP to console (replace with nodemailer for real email)
        console.log(`OTP for ${email}: ${otp}`);

        // TODO: Send OTP via email using nodemailer in production

        res.json({
          status: 'success',
          message: 'OTP sent to your email (check console in demo)',
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        console.error('Send OTP error:', err);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined,
          timestamp: new Date().toISOString()
        });
      }
    }
  );

  return router;
};