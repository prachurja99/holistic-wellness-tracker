const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');
const authMiddleware = require('../middleware/auth'); // using your existing auth.js

/**
 * @route   POST /api/journal
 * @desc    Create a new journal entry
 * @access  Private
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, tag, mood } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }

    const newEntry = new JournalEntry({
      userId: req.user._id || req.user.userId, // works with either token setup
      title,
      content,
      tag,
      mood
    });

    await newEntry.save();
    res.status(201).json({ success: true, message: "Entry saved successfully", entry: newEntry });

  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating the entry!',
      error: error.message || error.toString()
    });
  }
});

/**
 * @route   GET /api/journal
 * @desc    Get all journal entries for logged-in user
 * @access  Private
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Authenticated user:', req.user); // This will print the user info from the token
    const userId = req.user._id || req.user.userId;
    console.log('User ID used in query:', userId);

    const entries = await JournalEntry.find({ userId }).sort({ date: -1 });

    res.status(200).json({ success: true, entries });
  } catch (error) {
    console.error('Error fetching entries:', error); // This prints the full error on your server console
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message || error.toString(), // This sends the actual error message back in the response
    });
  }
});


/**
 * @route   PUT /api/journal/:id
 * @desc    Update a journal entry (owner only)
 * @access  Private
 */
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id || req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    res.json({ success: true, entry: updated });

  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating entry!',
      error: error.message || error.toString()
    });
  }
});

/**
 * @route   DELETE /api/journal/:id
 * @desc    Delete a journal entry (owner only)
 * @access  Private
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await JournalEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id || req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    res.json({ success: true, message: "Entry deleted successfully" });

  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting entry!',
      error: error.message || error.toString()
    });
  }
});

module.exports = router;



