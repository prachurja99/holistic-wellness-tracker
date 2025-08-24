const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Meditation = require('../models/Meditation');

// GET all meditations for user
router.get('/', protect, async (req, res) => {
  try {
    const meditations = await Meditation.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ success: true, meditations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST add new meditation
router.post('/', protect, async (req, res) => {
  try {
    const { date, type, duration, notes } = req.body;
    const meditation = new Meditation({
      user: req.user._id,
      date,
      type,
      duration,
      notes
    });
    await meditation.save();
    res.json({ success: true, meditation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE meditation by id
router.delete('/:id', protect, async (req, res) => {
  try {
    const meditation = await Meditation.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!meditation) return res.status(404).json({ success: false, message: 'Meditation not found' });
    res.json({ success: true, message: 'Meditation deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
