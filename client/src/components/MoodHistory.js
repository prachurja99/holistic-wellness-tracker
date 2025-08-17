import React from 'react';
import '../styles/MoodHistory.css';

const MoodHistory = ({ moodEntries = [], onDelete }) => {
  if (!moodEntries || moodEntries.length === 0) {
    return <p className="mood-no-entries">No mood entries yet.</p>;
  }

  return (
    <div className="mood-history">
      <h3>Mood History</h3>
      <ul className="mood-list">
        {moodEntries.map((entry) => {
          const id = entry.id || entry._id;
          const dateStr = entry.timestamp
            ? new Date(entry.timestamp).toLocaleString()
            : entry.date
            ? new Date(entry.date).toLocaleString()
            : 'Unknown';
          const emoji = entry.moodEmoji || entry.mood || '';

          return (
            <li key={id} className="mood-item">
              <div>
                <span className="mood-emoji">{emoji}</span>{' '}
                <strong>{dateStr}</strong>
                {entry.note && <p className="mood-note">{entry.note}</p>}
              </div>
              <button onClick={() => onDelete(id)} className="mood-delete-btn">
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










