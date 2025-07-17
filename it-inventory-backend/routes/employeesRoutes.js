const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // GET all employees
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM employees');
      res.json({ status: 'success', employees: rows });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // GET single employee by id
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ status: 'error', message: 'Not found' });
      res.json({ status: 'success', employee: rows[0] });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // CREATE employee
  router.post('/', async (req, res) => {
    try {
      const { employee_id, name, designation, department, intercom, phone, mobile, room_number, floor } = req.body;
      const [result] = await pool.query(
        'INSERT INTO employees (employee_id, name, designation, department, intercom, phone, mobile, room_number, floor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [employee_id, name, designation, department, intercom, phone, mobile, room_number, floor]
      );
      res.status(201).json({ status: 'success', id: result.insertId });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // UPDATE employee
  router.put('/:id', async (req, res) => {
    try {
      const { employee_id, name, designation, department, intercom, phone, mobile, room_number, floor } = req.body;
      await pool.query(
        'UPDATE employees SET employee_id=?, name=?, designation=?, department=?, intercom=?, phone=?, mobile=?, room_number=?, floor=? WHERE id=?',
        [employee_id, name, designation, department, intercom, phone, mobile, room_number, floor, req.params.id]
      );
      res.json({ status: 'success' });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // DELETE employee
  router.delete('/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
      res.json({ status: 'success' });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  return router;
}; 