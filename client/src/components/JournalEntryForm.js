import React, { useState } from 'react';

const JournalEntryForm = ({ onAddEntry }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.');
      return;
    }

    const newEntry = {
      title,
      content,
      tag,
      mood
    };

    // Call function from parent (Journal.js)
    onAddEntry(newEntry);

    // Clear form
    setTitle('');
    setContent('');
    setTag('');
    setMood('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Entry title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={textareaStyle}
      />
      <input
        type="text"
        placeholder="Tag (optional)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Mood (optional)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Add Entry</button>
    </form>
  );
};

// Simple styles
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
};
const inputStyle = {
  padding: '0.5rem',
  marginBottom: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc'
};
const textareaStyle = {
  padding: '0.5rem',
  marginBottom: '0.5rem',
  minHeight: '80px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};
const buttonStyle = {
  padding: '0.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
};

export default JournalEntryForm;


