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

  // ... (baaki CRUD aur employees ke endpoints bhi yahan ho sakte hain)
  return router;
};