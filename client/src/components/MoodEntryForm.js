import React, { useState } from 'react';
import '../styles/MoodEntryForm.css';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!moodValue) return alert('Please select a mood');

    const payload = {
      moodValue: Number(moodValue),
      moodEmoji: moodOptions.find((o) => o.value === Number(moodValue))?.label || '',
      note,
      timestamp: new Date().toISOString()
    };

    // Only add locally (no API)
    const localEntry = { id: Date.now(), ...payload };
    onAddMood && onAddMood(localEntry);

    setMoodValue('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="mood-entry-form">
      <label>
        Mood:
        <select value={moodValue} onChange={(e) => setMoodValue(e.target.value)} required className="mood-select">
          <option value="">Select mood</option>
          {moodOptions.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <label>
        Note (optional):
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write something about your mood..."
          rows={3}
          className="mood-textarea"
        />
      </label>
      <button type="submit" className="mood-submit-btn" disabled={loading}>
        {loading ? 'Saving...' : 'Add Mood'}
      </button>
    </form>
  );
};

export default MoodEntryForm;







