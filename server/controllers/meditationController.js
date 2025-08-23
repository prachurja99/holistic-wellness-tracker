const Meditation = require('../models/Meditation');

// Fetch all meditations for authenticated user
exports.getAllMeditations = async (req, res) => {
  try {
    const meditations = await Meditation.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ success: true, meditations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new meditation
exports.addMeditation = async (req, res) => {
  try {
    const meditation = new Meditation({ ...req.body, user: req.user._id });
    const savedMeditation = await meditation.save();
    res.status(201).json({ success: true, meditation: savedMeditation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
