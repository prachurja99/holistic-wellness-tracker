const Exercise = require('../models/Exercise');

// Fetch all exercises for authenticated user
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ success: true, exercises });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new exercise
exports.addExercise = async (req, res) => {
  try {
    const exercise = new Exercise({ ...req.body, user: req.user._id });
    const savedExercise = await exercise.save();
    res.status(201).json({ success: true, exercise: savedExercise });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
