import React from 'react';

const JournalEntriesList = ({ entries, onDelete }) => {
  if (!entries.length) return <p>No journal entries yet.</p>;

  return (
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      {entries.map(({ id, text, date }) => (
        <li
          key={id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '1rem',
            marginBottom: '1rem',
            position: 'relative',
          }}
        >
          <small style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: '#888' }}>
            {new Date(date).toLocaleString()}
          </small>
          <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
          <button
            onClick={() => onDelete(id)}
            style={{
              backgroundColor: '#ff4d4d',
              border: 'none',
              borderRadius: '3px',
              color: 'white',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              position: 'absolute',
              bottom: '0.5rem',
              right: '0.5rem',
            }}
            aria-label="Delete journal entry"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default JournalEntriesList;
