// client/src/pages/MoodTracker.js
import React, { useEffect, useState } from 'react';
import MoodEntryForm from '../components/MoodEntryForm';
import MoodHistory from '../components/MoodHistory';
import MoodTrendsChart from '../components/MoodTrendsChart';

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);

  // load local entries immediately for offline users
  useEffect(() => {
    const stored = localStorage.getItem('moodEntries');
    if (stored) setMoodEntries(JSON.parse(stored));
  }, []);

  // Keep localStorage up-to-date for offline fallback
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  // Add mood (called by MoodEntryForm)
  const handleAddMood = (entry) => {
    // If backend returned saved doc (it will have _id), ensure consistent shape
    const normalized = {
      id: entry.id || entry._id || Date.now(),
      _id: entry._id,
      moodValue: entry.moodValue,
      moodEmoji: entry.moodEmoji,
      note: entry.note,
      timestamp: entry.timestamp || entry.date || new Date().toISOString()
    };
    setMoodEntries((prev) => [normalized, ...prev]);
  };

  // Delete local fallback (for entries saved locally)
  const handleLocalDelete = (id) => {
    setMoodEntries((prev) => prev.filter((m) => (m._id || m.id) !== id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mood Tracker</h2>
      <MoodEntryForm onAddMood={handleAddMood} />
      <MoodHistory moodEntries={moodEntries} onDelete={handleLocalDelete} />
      <h3>Mood Trends</h3>
      <MoodTrendsChart moodEntries={moodEntries} />
    </div>
  );
};

export default MoodTracker;





