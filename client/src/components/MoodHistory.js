// client/src/components/MoodHistory.js
import React, { useEffect, useState } from 'react';
import { fetchMoods, deleteMoodApi } from '../api/moods';

const MoodHistory = ({ moodEntries: initialEntries = [], onDelete: onLocalDelete }) => {
  const [moods, setMoods] = useState(initialEntries);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      if (token) {
        setLoading(true);
        const res = await fetchMoods(token);
        setLoading(false);
        if (res.success) {
          setMoods(res.moods);
        } else {
          console.warn('Could not fetch moods from server, falling back to local', res.message);
          setMoods(initialEntries);
        }
      } else {
        setMoods(initialEntries);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (token) {
      const res = await deleteMoodApi(id, token);
      if (res.success) {
        setMoods((prev) => prev.filter((m) => m._id !== id && m.id !== id));
      } else {
        alert(res.message || 'Failed to delete');
      }
    } else {
      // local delete fallback
      const updated = moods.filter((m) => m.id !== id);
      setMoods(updated);
      onLocalDelete && onLocalDelete(id);
    }
  };

  if (loading) return <p>Loading mood history...</p>;
  if (!moods || moods.length === 0) return <p>No mood entries yet.</p>;

  return (
    <div>
      <h3>Mood History</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {moods.map((entry) => {
          // support both server (entry._id, entry.timestamp) and local (id, timestamp)
          const id = entry._id || entry.id;
          const dateStr = entry.timestamp ? new Date(entry.timestamp).toLocaleString() : (entry.date ? new Date(entry.date).toLocaleString() : 'Unknown');
          const emoji = entry.moodEmoji || (entry.mood ? entry.mood : '');
          return (
            <li key={id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '0.5rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '1.5rem' }}>{emoji}</span> {' '}
                <strong>{dateStr}</strong>
                {entry.note && <p style={{ margin: '0.25rem 0' }}>{entry.note}</p>}
              </div>
              <button onClick={() => handleDelete(id)} style={{ backgroundColor: '#ff4d4d', border: 'none', borderRadius: '3px', color: 'white', cursor: 'pointer', padding: '0.25rem 0.5rem' }}>
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




