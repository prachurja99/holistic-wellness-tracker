// /backend/models/JournalEntry.js

const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you will add user auth later
    required: false
  },
  title: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
