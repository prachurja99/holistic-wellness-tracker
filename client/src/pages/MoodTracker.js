import React, { useEffect } from 'react';
import MoodEntryForm from '../components/MoodEntryForm';
import MoodHistory from '../components/MoodHistory';
import MoodTrendsChart from '../components/MoodTrendsChart';
import { fetchMoods, createMood, deleteMoodApi } from '../api/moods';
import '../styles/MoodTracker.css';

const MoodTracker = ({ moods, setMoods }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadMoods = async () => {
      if (token) {
        const res = await fetchMoods(token);
        if (res.success) setMoods(res.moods);
      } else {
        const stored = localStorage.getItem('moods');
        if (stored) setMoods(JSON.parse(stored));
      }
    };
    loadMoods();
  }, [token, setMoods]);

  const reloadMoods = async () => {
    if (token) {
      const res = await fetchMoods(token);
      if (res.success) setMoods(res.moods);
    }
  };

  const handleAddMood = async (entry) => {
    if (token) {
      const res = await createMood(entry, token);
      if (res.success) await reloadMoods();
    } else {
      const localMood = { id: Date.now(), ...entry };
      setMoods((prev) => [localMood, ...prev]);
      localStorage.setItem('moods', JSON.stringify([localMood, ...moods]));
    }
  };

  const handleDeleteMood = async (id) => {
    if (token) {
      const res = await deleteMoodApi(id, token);
      if (res.success) await reloadMoods();
    } else {
      const updated = moods.filter((m) => m.id !== id);
      setMoods(updated);
      localStorage.setItem('moods', JSON.stringify(updated));
    }
  };

  return (
    <div className="container moodtracker-container">
      <h2>Mood Tracker</h2>
      <div className="card">
        <MoodEntryForm onAddMood={handleAddMood} />
      </div>
      <MoodHistory moodEntries={moods} onDelete={handleDeleteMood} />
      <div className="card" style={{ marginTop: '2rem' }}>
        {moods.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#ad6842' }}>No mood data to display yet.</p>
        ) : (
          <MoodTrendsChart moodEntries={moods} />
        )}
      </div>
    </div>
  );
};

export default MoodTracker;



















