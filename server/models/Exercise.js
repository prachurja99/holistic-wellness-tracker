const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true }, // e.g. Running, Yoga
  duration: { type: Number, required: true }, // minutes
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', ExerciseSchema);
