// src/components/HabitForm.js
import React, { useState } from 'react';

const categories = ['Health', 'Productivity', 'Learning', 'Fitness', 'Wellness', 'Other'];
const frequencies = ['Daily', 'Weekly', 'Custom'];

const HabitForm = ({ onAddHabit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [frequency, setFrequency] = useState('');
  const [goalCount, setGoalCount] = useState('');
  const [customFrequency, setCustomFrequency] = useState(''); // for custom freq
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a habit title.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }
    if (!frequency) {
      setError('Please select a frequency.');
      return;
    }
    if (frequency === 'Custom' && (!customFrequency || isNaN(customFrequency) || customFrequency <= 0)) {
      setError('Please enter a valid custom frequency (number of days).');
      return;
    }
    setError('');

    const newHabit = {
      id: Date.now(),
      title: title.trim(),
      category,
      frequency,
      customFrequency: frequency === 'Custom' ? Number(customFrequency) : null,
      goalCount: goalCount ? Number(goalCount) : null,
      createdAt: new Date().toISOString(),
      // other fields like completion data will come later
    };

    onAddHabit(newHabit);

    // Reset form
    setTitle('');
    setCategory('');
    setFrequency('');
    setCustomFrequency('');
    setGoalCount('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <label>
        Habit Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter habit title"
          required
          style={{ marginLeft: '0.5rem' }}
        />
      </label>
      <br />

      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Frequency:
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="">Select frequency</option>
          {frequencies.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>
      </label>
      <br />

      {frequency === 'Custom' && (
        <label>
          Custom Frequency (days):
          <input
            type="number"
            value={customFrequency}
            onChange={(e) => setCustomFrequency(e.target.value)}
            min="1"
            style={{ marginLeft: '0.5rem', width: '4rem' }}
            placeholder="e.g. 3"
            required
          />
        </label>
      )}
      {frequency === 'Custom' && <br />}

      <label>
        Goal Count (optional):
        <input
          type="number"
          value={goalCount}
          onChange={(e) => setGoalCount(e.target.value)}
          min="1"
          placeholder="e.g. 8"
          style={{ marginLeft: '0.5rem', width: '4rem' }}
        />
      </label>
      <br />

      <button type="submit" style={{ marginTop: '0.5rem' }}>
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;

