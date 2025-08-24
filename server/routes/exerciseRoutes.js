const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Exercise = require('../models/Exercise');

// GET all exercises for user
router.get('/', protect, async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ success: true, exercises });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST add new exercise
router.post('/', protect, async (req, res) => {
  try {
    const { date, type, duration, notes } = req.body;
    const exercise = new Exercise({
      user: req.user._id,
      date,
      type,
      duration,
      notes
    });
    await exercise.save();
    res.json({ success: true, exercise });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE exercise by id
router.delete('/:id', protect, async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!exercise) return res.status(404).json({ success: false, message: 'Exercise not found' });
    res.json({ success: true, message: 'Exercise deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
