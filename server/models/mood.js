const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moodValue: { type: Number, required: true },  // e.g. 1-10
  moodEmoji: { type: String },
  note: { type: String, trim: true },
  timestamp: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Mood = mongoose.model('Mood', moodSchema);
module.exports = Mood;
