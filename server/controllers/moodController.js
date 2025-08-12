const Mood = require('../models/Mood');

exports.createMood = async (req, res) => {
  try {
    const mood = await Mood.create({
      user: req.user._id,
      moodValue: req.body.moodValue,
      moodEmoji: req.body.moodEmoji,
      note: req.body.note,
      timestamp: req.body.timestamp || Date.now()
    });
    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!mood) return res.status(404).json({ message: 'Mood not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

