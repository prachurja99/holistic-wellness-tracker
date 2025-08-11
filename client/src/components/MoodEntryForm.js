// client/src/components/MoodEntryForm.js
import React, { useState } from 'react';
import { createMood as apiCreateMood } from '../api/moods';

const moodOptions = [
  { label: '😊 Happy', value: 8 },
  { label: '😐 Neutral', value: 5 },
  { label: '😔 Sad', value: 3 },
  { label: '😡 Angry', value: 2 },
  { label: '😰 Anxious', value: 1 },
];

const MoodEntryForm = ({ onAddMood }) => {
  const [moodValue, setMoodValue] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!moodValue) return alert('Please select a mood');

    const payload = {
      moodValue: Number(moodValue),
      moodEmoji: moodOptions.find((o) => o.value === Number(moodValue))?.label || '',
      note,
      timestamp: new Date().toISOString()
    };

    if (token) {
      setLoading(true);
      const res = await apiCreateMood(payload, token);
      setLoading(false);
      if (res.success) {
        // pass saved mood (from backend) to parent
        onAddMood && onAddMood(res.mood);
      } else {
        alert(res.message || 'Failed to save mood to server');
      }
    } else {
      // fallback: save locally
      const localEntry = { id: Date.now(), ...payload };
      onAddMood && onAddMood(localEntry);
    }

    setMoodValue('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <label>
        Mood:
        <select value={moodValue} onChange={(e) => setMoodValue(e.target.value)} required style={{ marginLeft: '0.5rem' }}>
          <option value="">Select mood</option>
          {moodOptions.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Note (optional):
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write something about your mood..." rows={3} style={{ width: '100%', marginTop: '0.5rem' }} />
      </label>
      <br />
      <button type="submit" style={{ marginTop: '0.5rem' }} disabled={loading}>
        {loading ? 'Saving...' : 'Add Mood'}
      </button>
    </form>
  );
};

export default MoodEntryForm;



