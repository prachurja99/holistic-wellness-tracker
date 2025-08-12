const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal
} = require('../controllers/journalController');

const router = express.Router();

// Get all journal entries for the logged-in user
router.get('/', protect, getJournals);

// Create a new journal entry
router.post('/', protect, createJournal);

// Update an existing journal entry by ID
router.put('/:id', protect, updateJournal);

// Delete a journal entry by ID
router.delete('/:id', protect, deleteJournal);

module.exports = router;





