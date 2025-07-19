// src/pages/MoodTracker.js
import React, { useEffect, useState } from 'react';
import MoodEntryForm from '../components/MoodEntryForm';
import MoodHistory from '../components/MoodHistory';
import MoodTrendsChart from '../components/MoodTrendsChart'; // Import the chart component

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);

  // Load saved moods from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('moodEntries');
    if (stored) setMoodEntries(JSON.parse(stored));
  }, []);

  // Save moods to localStorage whenever moodEntries changes
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  // Add a new mood entry
  const handleAddMood = (entry) => {
    setMoodEntries([entry, ...moodEntries]);
  };

  // Delete a mood entry by id
  const handleDeleteMood = (id) => {
    const updated = moodEntries.filter((entry) => entry.id !== id);
    setMoodEntries(updated);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mood Tracker</h2>
      <MoodEntryForm onAddMood={handleAddMood} />
      <MoodHistory moodEntries={moodEntries} onDelete={handleDeleteMood} />
      <h3>Mood Trends</h3>
      {/* ✅ Use key to trigger full chart refresh if needed */}
      <MoodTrendsChart key={moodEntries.length} moodEntries={moodEntries} />
    </div>
  );
};

export default MoodTracker;




