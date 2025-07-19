// src/components/MoodHistory.js
import React from 'react';

const MoodHistory = ({ moodEntries, onDelete }) => {
  if (!moodEntries || moodEntries.length === 0) {
    return <p>No mood entries yet.</p>;
  }

  return (
    <div>
      <h3>Mood History</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {moodEntries.map(({ id, moodEmoji, note, timestamp }) => (
          <li
            key={id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontSize: '1.5rem' }}>{moodEmoji}</span>{' '}
              <strong>
                {timestamp && !isNaN(new Date(timestamp))
                  ? new Date(timestamp).toLocaleDateString()
                  : 'Unknown Date'}
              </strong>
              {note && <p style={{ margin: '0.25rem 0' }}>{note}</p>}
            </div>
            <button
              onClick={() => onDelete(id)}
              style={{
                backgroundColor: '#ff4d4d',
                border: 'none',
                borderRadius: '3px',
                color: 'white',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
              }}
              aria-label="Delete mood entry"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodHistory;



