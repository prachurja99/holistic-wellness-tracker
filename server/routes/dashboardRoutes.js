// routes/dashboardRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const Exercise = require('../models/Exercise');
const Meditation = require('../models/Meditation');
const Habit = require('../models/Habit');
const Mood = require('../models/Mood');
const Journal = require('../models/Journal');
const Goal = require('../models/Goal');

const router = express.Router();

router.get('/summary', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Wellness logs
    const allExercises = await Exercise.find({ user: userId });
    const allMeditations = await Meditation.find({ user: userId });
    const recentExercises = await Exercise.find({ user: userId }).sort({ date: -1 }).limit(5);
    const recentMeditations = await Meditation.find({ user: userId }).sort({ date: -1 }).limit(5);
    const combinedWellnessLogs = [...recentExercises, ...recentMeditations]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // Habits
    const allHabits = await Habit.find({ user: userId });
    const recentHabits = await Habit.find({ user: userId }).sort({ createdAt: -1 }).limit(5);

    // Moods
    const allMoods = await Mood.find({ user: userId });
    const recentMoods = await Mood.find({ user: userId }).sort({ createdAt: -1 }).limit(5);

    // Journals
    const allJournals = await Journal.find({ user: userId });
    const recentJournals = await Journal.find({ user: userId }).sort({ createdAt: -1 }).limit(5);

    // Goals
    const allGoals = await Goal.find({ user: userId });
    const recentGoals = await Goal.find({ user: userId }).sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      wellnessLogs: combinedWellnessLogs,
      totalWellnessLogs: allExercises.length + allMeditations.length,
      totalExercises: allExercises.length,
      totalMeditations: allMeditations.length,

      totalHabits: allHabits.length,
      recentHabits,

      totalMoods: allMoods.length,
      recentMoods,

      totalJournals: allJournals.length,
      recentJournals,

      totalGoals: allGoals.length,
      recentGoals,
    });
  } catch (error) {
    console.error('Dashboard route error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;



