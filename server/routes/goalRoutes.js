const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getGoals,
  create,
  update,
  delete: deleteGoal,
  markFinished,
  unmarkFinished,
  getStats,
  getFinished
} = require('../controllers/goalController');

const router = express.Router();

router.get('/', protect, getGoals);
router.get('/finished', protect, getFinished);
router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, deleteGoal);
router.post('/finish', protect, markFinished);
router.post('/unfinish', protect, unmarkFinished);
router.get('/stats', protect, getStats);

module.exports = router;





