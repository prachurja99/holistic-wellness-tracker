// src/pages/MoodTracker.js
import React, { useEffect, useState } from 'react';
import MoodEntryForm from '../components/MoodEntryForm';
import MoodHistory from '../components/MoodHistory';
import MoodTrendsChart from '../components/MoodTrendsChart';
import { fetchMoods, createMood, deleteMoodApi } from '../api/moods';

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  // Load moods from backend OR localStorage
  useEffect(() => {
    const loadData = async () => {
      if (token) {
        setLoading(true);
        const res = await fetchMoods(token);
        setLoading(false);

        if (res.success) {
          setMoodEntries(res.moods);
          localStorage.setItem('moodEntries', JSON.stringify(res.moods));
        } else {
          console.warn('Backend fetch failed:', res.message, 'Using localStorage fallback');
          const stored = localStorage.getItem('moodEntries');
          if (stored) setMoodEntries(JSON.parse(stored));
        }
      } else {
        const stored = localStorage.getItem('moodEntries');
        if (stored) setMoodEntries(JSON.parse(stored));
      }
    };
    loadData();
  }, [token]);

  // Keep localStorage up-to-date
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  // Add mood entry
  const handleAddMood = async (entry) => {
    if (token) {
      const res = await createMood(entry, token);
      if (res.success) {
        setMoodEntries(prev => [res.mood, ...prev]);
        return;
      }
      console.warn('Could not save mood to backend:', res.message);
    }
    // Offline fallback
    const localEntry = { id: Date.now(), ...entry };
    setMoodEntries(prev => [localEntry, ...prev]);
  };

  // Delete mood
  const handleDeleteMood = async (id) => {
    if (token) {
      const res = await deleteMoodApi(id, token);
      if (!res.success) {
        console.warn('Could not delete mood from backend:', res.message);
      }
    }
    setMoodEntries(prev => prev.filter(mood => mood._id !== id && mood.id !== id));
  };

  return (
    <div className="container">
      <h2>Mood Tracker</h2>
      <div className="card">
        <MoodEntryForm onAddMood={handleAddMood} />
      </div>

      {loading ? (
        <p>Loading moods...</p>
      ) : (
        <>
          <div className="card">
            <MoodHistory moodEntries={moodEntries} onDelete={handleDeleteMood} />
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Mood Trends</h3>
            <MoodTrendsChart moodEntries={moodEntries} />
          </div>
        </>
      )}
    </div>
  );
};

export default MoodTracker;








