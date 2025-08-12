const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  markGoalFinished,     // ✅ make sure this is exported from goalController.js
  unmarkGoalFinished,   // ✅ optional: for un-finishing a goal
  getGoalCompletionStats // ✅ optional: for stats/pie chart
} = require('../controllers/goalController');

const router = express.Router();

// Get all goals (filter by type optional)
router.get('/', protect, getGoals);

// Create a goal
router.post('/', protect, createGoal);

// Update a goal
router.put('/:id', protect, updateGoal);

// Delete a goal
router.delete('/:id', protect, deleteGoal);

// Mark goal as finished
router.post('/finish', protect, markGoalFinished);

// Unmark goal as finished
router.post('/unfinish', protect, unmarkGoalFinished);

// Get goal stats (finished vs unfinished)
router.get('/stats', protect, getGoalCompletionStats);

module.exports = router;


