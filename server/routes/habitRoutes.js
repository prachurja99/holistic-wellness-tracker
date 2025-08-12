// server/routes/habitRoutes.js
const express = require('express');
const Habit = require('../models/Habit');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @desc Get all habits for the logged-in user
 * @route GET /api/habits
 */
router.get('/', protect, async (req, res) => {
  const habits = await Habit.find({ user: req.user._id }).sort('-createdAt');
  res.json(habits);
});

/**
 * @desc Add a new habit
 * @route POST /api/habits
 */
router.post('/', protect, async (req, res) => {
  const { title, category, frequency, customFrequency, goalCount } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Habit title is required' });
  }

  const habit = await Habit.create({
    user: req.user._id,
    title,
    category,
    frequency,
    customFrequency,
    goalCount,
    completion: [],
  });

  res.status(201).json(habit);
});

/**
 * @desc Delete a habit
 * @route DELETE /api/habits/:id
 */
router.delete('/:id', protect, async (req, res) => {
  const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!habit) {
    return res.status(404).json({ success: false, message: 'Habit not found' });
  }
  res.json({ success: true });
});

/**
 * @desc Toggle completion for a specific date
 * @route PUT /api/habits/:id/complete
 */
router.put('/:id/complete', protect, async (req, res) => {
  const { date } = req.body; // Format: YYYY-MM-DD
  const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });

  if (!habit) {
    return res.status(404).json({ success: false, message: 'Habit not found' });
  }

  const idx = habit.completion.indexOf(date);
  if (idx > -1) {
    habit.completion.splice(idx, 1); // unmark
  } else {
    habit.completion.push(date); // mark complete
  }

  await habit.save();
  res.json(habit);
});

module.exports = router;

