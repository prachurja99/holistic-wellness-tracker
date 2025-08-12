import React from 'react';
import { deleteMoodApi } from '../api/moods';

const MoodHistory = ({ moodEntries = [], onDelete }) => {
  const token = localStorage.getItem('token');

  const handleDelete = async (id) => {
    if (token) {
      const res = await deleteMoodApi(id, token);
      if (res.success) {
        onDelete && onDelete(id);
      } else {
        alert(res.message || 'Failed to delete');
      }
    } else {
      // local delete
      onDelete && onDelete(id);
    }
  };

  if (!moodEntries || moodEntries.length === 0) {
    return <p>No mood entries yet.</p>;
  }

  return (
    <div>
      <h3>Mood History</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {moodEntries.map((entry) => {
          const id = entry._id || entry.id;
          const dateStr = entry.timestamp
            ? new Date(entry.timestamp).toLocaleString()
            : entry.date
            ? new Date(entry.date).toLocaleString()
            : 'Unknown';
          const emoji = entry.moodEmoji || entry.mood || '';

          return (
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
                <span style={{ fontSize: '1.5rem' }}>{emoji}</span>{' '}
                <strong>{dateStr}</strong>
                {entry.note && (
                  <p style={{ margin: '0.25rem 0' }}>{entry.note}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(id)}
                style={{
                  backgroundColor: '#ff4d4d',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoodHistory;





