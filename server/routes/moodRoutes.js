const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ same as journals
const { createMood, getMoods, deleteMood } = require('../controllers/moodController');

// Create new mood entry
router.post('/', protect, createMood);

// Get all moods
router.get('/', protect, getMoods);

// Delete mood by ID
router.delete('/:id', protect, deleteMood);

module.exports = router;

