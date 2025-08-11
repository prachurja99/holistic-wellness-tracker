const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // assumes you already have this
const { createMood, getMoods, deleteMood } = require('../controllers/moodController');

router.post('/', auth, createMood);
router.get('/', auth, getMoods);
router.delete('/:id', auth, deleteMood);

module.exports = router;
