const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // GET all designations
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM designations');
      res.json({ status: 'success', designations: rows });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // GET single designation by id
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM designations WHERE id = ?', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ status: 'error', message: 'Not found' });
      res.json({ status: 'success', designation: rows[0] });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // CREATE designation
  router.post('/', async (req, res) => {
    try {
      const { designation } = req.body;
      const [result] = await pool.query(
        'INSERT INTO designations (designation) VALUES (?)',
        [designation]
      );
      res.status(201).json({ status: 'success', id: result.insertId });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // UPDATE designation
  router.put('/:id', async (req, res) => {
    try {
      const { designation } = req.body;
      await pool.query(
        'UPDATE designations SET designation=? WHERE id=?',
        [designation, req.params.id]
      );
      res.json({ status: 'success' });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  // DELETE designation
  router.delete('/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM designations WHERE id = ?', [req.params.id]);
      res.json({ status: 'success' });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  return router;
}; 