const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  type: { 
    type: String, 
    enum: ['goal', 'habit', 'journal', 'custom'], 
    default: 'custom' 
  },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }, // optional if type === 'goal'
  time: { type: String, required: true }, // "HH:mm" format
  days: [{
    type: String,
    enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }],
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Reminder', ReminderSchema);
