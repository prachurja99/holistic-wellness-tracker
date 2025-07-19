import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!moodValue) {
      alert('Please select a mood.');
      return;
    }

    const newEntry = {
      id: Date.now(), // unique ID
      moodValue: Number(moodValue), // numeric mood for chart & sorting
      moodEmoji: moodOptions.find((opt) => opt.value === Number(moodValue))?.label || '',
      note,
      timestamp: new Date().toISOString(), // consistent key
    };

    onAddMood(newEntry);
    setMoodValue('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <label>
        Mood:
        <select
          value={moodValue}
          onChange={(e) => setMoodValue(e.target.value)}
          required
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="">Select mood</option>
          {moodOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Note (optional):
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write something about your mood..."
          rows={3}
          style={{ width: '100%', marginTop: '0.5rem' }}
        />
      </label>
      <br />
      <button type="submit" style={{ marginTop: '0.5rem' }}>
        Add Mood
      </button>
    </form>
  );
};

export default MoodEntryForm;


