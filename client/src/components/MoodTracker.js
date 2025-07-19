import React, { useEffect, useState } from 'react';
import MoodEntryForm from '../components/MoodEntryForm';
import MoodHistory from '../components/MoodHistory';

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('moodEntries');
    if (stored) setMoodEntries(JSON.parse(stored));
  }, []);

  // Save to localStorage when moodEntries changes
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleAddMood = (entry) => {
    setMoodEntries([entry, ...moodEntries]);
  };

  const handleDeleteMood = (id) => {
    const updated = moodEntries.filter((entry) => entry.id !== id);
    setMoodEntries(updated);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mood Tracker</h2>
      <MoodEntryForm onAddMood={handleAddMood} />
      <MoodHistory moodEntries={moodEntries} onDelete={handleDeleteMood} />
    </div>
  );
};

export default MoodTracker;

