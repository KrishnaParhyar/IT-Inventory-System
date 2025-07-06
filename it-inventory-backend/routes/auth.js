const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length > 0) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    db.query(
  "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
  [name, email, hashedPassword, role],
  (err, result) => {
    if (err) {
      console.error("🔴 MySQL Insert Error:", err.sqlMessage);  // LOG THE EXACT ERROR
      return res.status(500).json({ error: "Failed to register user", detail: err.sqlMessage });
    }
    res.status(201).json({ message: "User registered successfully" });
  }
);

  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Received data:", req.body); // ← Add this line

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ error: "User not found" });

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { id: user.id, name: user.name } });
  });
});

module.exports = router;
