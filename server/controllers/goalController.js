const Goal = require('../models/Goal');
const FinishedGoal = require('../models/FinishedGoal');
const mongoose = require('mongoose');

/**
 * Get all goals for the logged-in user (optionally filtered by goalType)
 */
exports.getGoals = async (req, res) => {
  try {
    const query = { user: req.user._id };
    if (req.query.goalType) query.goalType = req.query.goalType;
    const goals = await Goal.find(query).sort({ deadline: 1 });
    res.json({ success: true, goals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Create a new goal
 */
exports.createGoal = async (req, res) => {
  try {
    const { title, description, goalType, category, progress, milestoneSteps, deadline, status } = req.body;
    if (!title || !goalType) {
      return res.status(400).json({ success: false, message: 'Title and goal type are required' });
    }
    const goal = await Goal.create({
      user: req.user._id,
      title,
      description,
      goalType,
      category,
      progress,
      milestoneSteps,
      deadline,
      status
    });
    res.status(201).json({ success: true, goal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Update an existing goal
 */
exports.updateGoal = async (req, res) => {
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

/**
 * Delete a goal
 */
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Mark a goal as finished for a given date & goal type
 */
exports.markGoalFinished = async (req, res) => {
  try {
    const { goalId, date, goalType } = req.body;
    if (!goalId || !date || !goalType) {
      return res.status(400).json({ success: false, message: 'goalId, date and goalType are required' });
    }

    const userId = req.user._id;

    const record = await FinishedGoal.findOneAndUpdate(
      { user: userId, goalType, date },
      { $addToSet: { finishedGoalIds: goalId } },
      { new: true, upsert: true }
    );

    res.json({ success: true, finishedGoals: record.finishedGoalIds });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Unmark (remove) a goal from finished list for a given date & goal type
 */
exports.unmarkGoalFinished = async (req, res) => {
  try {
    const { goalId, date, goalType } = req.body;
    if (!goalId || !date || !goalType) {
      return res.status(400).json({ success: false, message: 'goalId, date and goalType are required' });
    }

    const userId = req.user._id;

    const record = await FinishedGoal.findOneAndUpdate(
      { user: userId, goalType, date },
      { $pull: { finishedGoalIds: goalId } },
      { new: true }
    );

    res.json({ success: true, finishedGoals: record ? record.finishedGoalIds : [] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get stats: total vs finished vs unfinished goals for a given date & goal type
 */
exports.getGoalCompletionStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const { goalType, date } = req.query;

    if (!goalType || !date) {
      return res.status(400).json({ success: false, message: 'goalType and date query params required' });
    }

    const allGoals = await Goal.find({ user: userId, goalType });
    const total = allGoals.length;

    const finishedRecord = await FinishedGoal.findOne({ user: userId, goalType, date });
    const finishedCount = finishedRecord ? finishedRecord.finishedGoalIds.length : 0;

    res.json({
      success: true,
      total,
      finished: finishedCount,
      unfinished: total - finishedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



