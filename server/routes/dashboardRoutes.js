// routes/dashboardRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Exercise = require('../models/Exercise');
const Meditation = require('../models/Meditation');

const router = express.Router();

router.get('/summary', protect, async (req, res) => {
  try {
    const recentExercises = await Exercise.find({ user: req.user._id }).limit(5);
    const recentMeditations = await Meditation.find({ user: req.user._id }).limit(5);

    const combinedWellnessLogs = [...recentExercises, ...recentMeditations]
      .sort((a, b) => (b.date > a.date ? 1 : -1))
      .slice(0, 5);

    res.json({ success: true, wellnessLogs: combinedWellnessLogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;



