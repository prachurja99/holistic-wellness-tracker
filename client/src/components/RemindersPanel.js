import React from 'react';

export default function RemindersPanel({ reminders, onDelete }) {
  if (!reminders.length) return <p style={{ padding: '1rem' }}>No reminders.</p>;

  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: '0 1rem', maxHeight: '300px', overflowY: 'auto' }}>
      {reminders.map((rem) => (
        <li
          key={rem._id}
          style={{
            padding: '0.5rem 0',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <strong>{rem.title}</strong><br />
            {rem.days && rem.days.length > 0
              ? `${rem.time} on ${rem.days.join(', ')}`
              : rem.date
              ? `${rem.time} on ${rem.date}`
              : `${rem.time}`}
          </div>
          <button
            onClick={() => onDelete(rem._id)}
            style={{ background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}

