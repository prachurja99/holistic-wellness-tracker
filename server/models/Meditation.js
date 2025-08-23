const mongoose = require('mongoose');

const MeditationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true }, // e.g. Mindfulness, Breathing
  duration: { type: Number, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Meditation', MeditationSchema);

