const mongoose = require('mongoose');

const finishedGoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalType: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true,
  },
  finishedGoalIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
  date: { type: String, required: true }, // Store date as string 'YYYY-MM-DD' for daily tracking
}, { timestamps: true });

finishedGoalSchema.index({ user: 1, goalType: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('FinishedGoal', finishedGoalSchema);
