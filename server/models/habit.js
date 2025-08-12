// server/models/Habit.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Other' }, // Match categories from HabitForm
  frequency: { type: String, default: 'Daily' },
  customFrequency: { type: Number, default: null }, // e.g. every 3 days
  goalCount: { type: Number, default: null }, // e.g. 8 glasses of water
  completion: [{ type: String }], // Dates completed (YYYY-MM-DD)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Habit', habitSchema);

