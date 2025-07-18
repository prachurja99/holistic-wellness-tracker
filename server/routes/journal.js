const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/JournalEntry");

// POST a new journal entry
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newEntry = new JournalEntry({ title, content });
    await newEntry.save();
    res.status(201).json({ message: "Entry saved successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to save entry." });
  }
});

// GET all journal entries
router.get("/", async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries." });
  }
});

module.exports = router;
