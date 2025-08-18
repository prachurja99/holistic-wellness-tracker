const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Reminder = require('../models/Reminder');

// Create a new reminder
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, goalId, date, time, repeat, days, enabled } = req.body;

    if (!title || !time) {
      return res.status(400).json({ success: false, message: 'Title and time are required' });
    }
    if (!repeat && !date) {
      return res.status(400).json({ success: false, message: 'Date is required for one-time reminders' });
    }
    if (repeat && (!days || days.length === 0)) {
      return res.status(400).json({ success: false, message: 'Days are required for recurring reminders' });
    }

    const newReminder = new Reminder({
      userId: req.user._id,
      goalId,
      title,
      description: description || '',
      date: repeat ? undefined : date,
      time,
      repeat: !!repeat,
      days: repeat ? days : [],
      enabled: enabled !== undefined ? enabled : true,
    });

    await newReminder.save();
    res.json({ success: true, reminder: newReminder });
  } catch (error) {
    console.error('Failed to create reminder:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all reminders for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, reminders });
  } catch (error) {
    console.error('Failed to get reminders:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update reminder by id
router.patch('/:id', protect, async (req, res) => {
  try {
    const updated = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    res.json({ success: true, reminder: updated });
  } catch (error) {
    console.error('Failed to update reminder:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, goalId, date, time, repeat, days, enabled } = req.body;

    if (!title || !time) {
      return res.status(400).json({ success: false, message: 'Title and time are required' });
    }

    if (!repeat && !date) {
      return res.status(400).json({ success: false, message: 'Date is required for one-time reminders' });
    }

    if (repeat && (!days || days.length === 0)) {
      return res.status(400).json({ success: false, message: 'Days are required for recurring reminders' });
    }

    const newReminder = new Reminder({
      userId: req.user._id,
      goalId,
      title,
      description: description || '',
      date: repeat ? undefined : date,  // IMPORTANT: Save date only if not repeating
      time,
      repeat: !!repeat,
      days: repeat ? days : [],
      enabled: enabled !== undefined ? enabled : true,
    });

    await newReminder.save();
    res.json({ success: true, reminder: newReminder });
  } catch (error) {
    console.error('Failed to create reminder:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Delete reminder by id
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await Reminder.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    res.json({ success: true, message: 'Reminder deleted' });
  } catch (error) {
    console.error('Failed to delete reminder:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

