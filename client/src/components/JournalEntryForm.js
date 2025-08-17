import React, { useState } from 'react';
import '../styles/JournalEntryForm.css';

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

    onAddEntry(newEntry);

    setTitle('');
    setContent('');
    setTag('');
    setMood('');
  };

  return (
    <form onSubmit={handleSubmit} className="journal-form">
      <input
        type="text"
        placeholder="Entry title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="journal-input"
      />
      <textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="journal-textarea"
      />
      <input
        type="text"
        placeholder="Tag (optional)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="journal-input"
      />
      <input
        type="text"
        placeholder="Mood (optional)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="journal-input"
      />
      <button type="submit" className="btn-add">Add Entry</button>
    </form>
  );
};

export default JournalEntryForm;



