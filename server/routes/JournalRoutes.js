const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// POST /api/journal - Add a journal entry
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    const entry = new JournalEntry({ content });
    await entry.save();
    res.status(201).json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/journal - Get all journal entries
router.get('/', async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ date: -1 });
    res.status(200).json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
