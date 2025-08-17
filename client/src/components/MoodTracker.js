import React, { useEffect, useState } from 'react';
import MoodEntryForm from '../components/MoodEntryForm';
import MoodHistory from '../components/MoodHistory';
import '../styles/MoodTracker.css';

const MOOD_ENTRIES_KEY = 'moodEntries';

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(MOOD_ENTRIES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setMoodEntries(parsed);
      } catch {
        setMoodEntries([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleAddMood = (entry) => {
    // Always use id for local moods (or assign if missing)
    const id = entry.id || entry._id || Date.now();
    setMoodEntries([{ ...entry, id }, ...moodEntries]);
  };

  const handleDeleteMood = (id) => {
    // Handles both id/_id fields
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
    </div>
  );
};

export default MoodTracker;



