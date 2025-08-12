const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    goalType: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: true
    },
    category: { type: String, trim: true }, // e.g. Fitness, Career
    progress: { type: Number, default: 0, min: 0, max: 100 },
    milestoneSteps: [
      { title: String, completed: { type: Boolean, default: false } }
    ],
    deadline: { type: Date },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);

