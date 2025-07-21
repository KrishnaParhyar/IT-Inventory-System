const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // Get all departments
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM departments');
      res.json({ status: 'success', departments: rows });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // Get single department by id
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM departments WHERE id = ?', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ status: 'error', message: 'Not found' });
      res.json({ status: 'success', department: rows[0] });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // Update department
  router.put('/:id', async (req, res) => {
    try {
      const { name, location } = req.body;
      await pool.query(
        'UPDATE departments SET name=?, location=? WHERE id=?',
        [name, location, req.params.id]
      );
      res.json({ status: 'success' });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // Get employees for a department
  router.get('/:id/employees', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM employees WHERE department = (SELECT name FROM departments WHERE id = ?)', [req.params.id]);
      res.json({ status: 'success', employees: rows });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // Add employee to a department
  router.post('/:id/employees', async (req, res) => {
    try {
      const { employee_id, name, designation, intercom, phone, mobile, room_number, floor } = req.body;
      // Get department name by id
      const [deptRows] = await pool.query('SELECT name FROM departments WHERE id = ?', [req.params.id]);
      if (deptRows.length === 0) return res.status(404).json({ status: 'error', message: 'Department not found' });
      const department = deptRows[0].name;
      const [result] = await pool.query(
        'INSERT INTO employees (employee_id, name, designation, department, intercom, phone, mobile, room_number, floor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [employee_id, name, designation, department, intercom, phone, mobile, room_number, floor]
      );
      res.status(201).json({ status: 'success', id: result.insertId });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  return router;
};