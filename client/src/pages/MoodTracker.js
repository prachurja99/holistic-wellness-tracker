import React, { useState } from 'react';
import { useEffect } from 'react';
import MoodEntryForm from '../components/MoodEntryForm';
import MoodHistory from '../components/MoodHistory';
import MoodTrendsChart from '../components/MoodTrendsChart';
import '../styles/MoodTracker.css';

const MOOD_ENTRIES_KEY = 'moodEntries';

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState(() => {
    // Always initialize from localStorage!
    try {
      const stored = localStorage.getItem(MOOD_ENTRIES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleAddMood = (entry) => {
    const id = entry.id || entry._id || Date.now();
    setMoodEntries([{ ...entry, id }, ...moodEntries]);
  };

  const handleDeleteMood = (id) => {
    const updated = moodEntries.filter((entry) => (entry.id || entry._id) !== id);
    setMoodEntries(updated);
  };

  return (
    <div className="container moodtracker-container">
      <h2>Mood Tracker</h2>
      <div className="card">
        <MoodEntryForm onAddMood={handleAddMood} />
      </div>
      <MoodHistory moodEntries={moodEntries} onDelete={handleDeleteMood} />
      <div className="card" style={{ marginTop: '2rem' }}>
        {moodEntries.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#ad6842' }}>
            No mood data to display yet.
          </p>
        ) : (
          <MoodTrendsChart moodEntries={moodEntries} />
        )}
      </div>
    </div>
  );
};

export default MoodTracker;













