const Mood = require('../models/Mood');

// POST /api/moods
const createMood = async (req, res) => {
  try {
    const userId = req.user.userId; // set by your auth middleware
    const { moodValue, moodEmoji, note, timestamp } = req.body;

    if (typeof moodValue === 'undefined') {
      return res.status(400).json({ success: false, message: 'moodValue is required' });
    }

    const mood = new Mood({
      user: userId,
      moodValue,
      moodEmoji: moodEmoji || '',
      note: note || '',
      timestamp: timestamp ? new Date(timestamp) : undefined
    });

    await mood.save();

    res.status(201).json({ success: true, mood });
  } catch (error) {
    console.error('createMood error:', error);
    res.status(500).json({ success: false, message: 'Server error creating mood', error: error.message });
  }
};

// GET /api/moods
const getMoods = async (req, res) => {
  try {
    const userId = req.user.userId;
    const moods = await Mood.find({ user: userId }).sort({ timestamp: -1 });
    res.json({ success: true, moods });
  } catch (error) {
    console.error('getMoods error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching moods', error: error.message });
  }
};

// DELETE /api/moods/:id
const deleteMood = async (req, res) => {
  try {
    const userId = req.user.userId;
    const moodId = req.params.id;
    const mood = await Mood.findOneAndDelete({ _id: moodId, user: userId });
    if (!mood) return res.status(404).json({ success: false, message: 'Mood not found' });
    res.json({ success: true, message: 'Mood deleted' });
  } catch (error) {
    console.error('deleteMood error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting mood', error: error.message });
  }
};

module.exports = { createMood, getMoods, deleteMood };
