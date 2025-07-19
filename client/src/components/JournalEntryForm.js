import React, { useState } from 'react';

const JournalEntryForm = ({ onAddEntry }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: text.trim(),
      date: new Date().toISOString(),
    };

    onAddEntry(newEntry);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <textarea
        rows={5}
        placeholder="Write your journal entry..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <button type="submit" style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}>
        Add Entry
      </button>
    </form>
  );
};

export default JournalEntryForm;
