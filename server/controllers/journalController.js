const Journal = require('../models/Journal');

// @desc    Get all journal entries for a user
// @route   GET /api/journal
// @access  Private
exports.getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ success: true, journals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create a new journal entry
// @route   POST /api/journal
// @access  Private
exports.createJournal = async (req, res) => {
  try {
    const { title, content, tag, mood, date } = req.body;

    if (!title || !title.trim() || !content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const journal = await Journal.create({
      user: req.user._id,
      title,
      content,
      tag,
      mood,
      date: date || Date.now()
    });

    res.status(201).json({ success: true, journal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update a journal entry (partial update allowed)
// @route   PUT /api/journal/:id
// @access  Private
exports.updateJournal = async (req, res) => {
  try {
    const { title, content, tag, mood, date } = req.body;

    // Find the existing entry
    const journal = await Journal.findOne({ _id: req.params.id, user: req.user._id });
    if (!journal) {
      return res.status(404).json({ success: false, message: 'Journal entry not found' });
    }

    // Update only provided fields, keep old ones if not sent
    if (title !== undefined) journal.title = title;
    if (content !== undefined) journal.content = content;
    if (tag !== undefined) journal.tag = tag;
    if (mood !== undefined) journal.mood = mood;
    journal.date = date || Date.now(); // always refresh date on edit

    await journal.save();

    res.json({ success: true, journal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete a journal entry
// @route   DELETE /api/journal/:id
// @access  Private
exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!journal) {
      return res.status(404).json({ success: false, message: 'Journal entry not found' });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

