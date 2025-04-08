const express = require('express');
const router = express.Router();
const db = require('../db/database');

// CREATE GROUP
router.post('/', (req, res) => {
  const { name, description } = req.body;
  db.run(`INSERT INTO groups (name, description) VALUES (?, ?)`, [name, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, description });
  });
});

// GET ALL GROUPS
router.get('/', (req, res) => {
  db.all(`SELECT * FROM groups`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
// ONE GROUP BY ID
router.get('/:id', (req, res) => {
  const groupId = req.params.id;
  db.get(`SELECT * FROM groups WHERE id = ?`, [groupId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Group not found' });
    res.json(row);
  });
});

// UPDATE GROUP USING ID
router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  db.run(`UPDATE groups SET name = ?, description = ? WHERE id = ?`, [name, description, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// DELETE GROUP USING ID
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM groups WHERE id = ?`, req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
