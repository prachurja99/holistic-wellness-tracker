const Goal = require('../models/Goal');
const FinishedGoal = require('../models/FinishedGoal');

exports.getGoals = async (req, res) => {
  try {
    const userId = req.user._id;
    const { goalType, date } = req.query;
    if (!goalType || !date) {
      return res.status(400).json({ success: false, message: 'goalType and date required' });
    }
    const finishedRecord = await FinishedGoal.findOne({ user: userId, goalType, date });
    const finishedIds = finishedRecord ? finishedRecord.finishedGoalIds.map(id => id.toString()) : [];
    const query = { user: userId, goalType, _id: { $nin: finishedIds } };
    const goals = await Goal.find(query).sort({ deadline: 1 });
    res.json({ success: true, goals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, goalType, category, progress, milestoneSteps, deadline, status } = req.body;
    if (!title || !goalType) {
      return res.status(400).json({ success: false, message: 'Title and goalType required' });
    }
    const goal = await Goal.create({ user: req.user._id, title, description, goalType, category, progress, milestoneSteps, deadline, status });
    res.status(201).json({ success: true, goal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    Object.assign(goal, req.body);
    await goal.save();
    res.json({ success: true, goal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.markFinished = async (req, res) => {
  try {
    const { goalId, date, goalType } = req.body;
    if (!goalId || !date || !goalType) {
      return res.status(400).json({ success: false, message: 'goalId, date, goalType required' });
    }
    const userId = req.user._id;
    const record = await FinishedGoal.findOneAndUpdate(
      { user: userId, goalType, date },
      { $addToSet: { finishedGoalIds: goalId } },
      { new: true, upsert: true }
    );
    res.json({ success: true, finishedGoalIds: record.finishedGoalIds });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.unmarkFinished = async (req, res) => {
  try {
    const { goalId, date, goalType } = req.body;
    if (!goalId || !date || !goalType) {
      return res.status(400).json({ success: false, message: 'goalId, date, goalType required' });
    }
    const userId = req.user._id;
    const record = await FinishedGoal.findOneAndUpdate(
      { user: userId, goalType, date },
      { $pull: { finishedGoalIds: goalId } },
      { new: true }
    );
    res.json({ success: true, finishedGoalIds: record ? record.finishedGoalIds : [] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const { goalType, date } = req.query;
    if (!goalType || !date) {
      return res.status(400).json({ success: false, message: 'goalType and date required' });
    }
    const allGoals = await Goal.find({ user: userId, goalType });
    const total = allGoals.length;
    const finishedRecord = await FinishedGoal.findOne({ user: userId, goalType, date });
    const finishedCount = finishedRecord ? finishedRecord.finishedGoalIds.length : 0;
    res.json({ success: true, total, finished: finishedCount, unfinished: total - finishedCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFinished = async (req, res) => {
  try {
    const userId = req.user._id;
    const { goalType, date } = req.query;
    if (!goalType || !date) {
      return res.status(400).json({ success: false, message: 'goalType and date required' });
    }
    const finishedRecord = await FinishedGoal.findOne({ user: userId, goalType, date }).populate('finishedGoalIds');
    const finishedGoals = finishedRecord ? finishedRecord.finishedGoalIds : [];
    res.json({ success: true, goals: finishedGoals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};







