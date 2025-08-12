import React, { useState } from 'react';
import HabitCalendar from './HabitCalendar';

const HabitList = ({ habits, onDelete, onToggleComplete }) => {
  const [calendarVisibleFor, setCalendarVisibleFor] = useState(null);

  const toggleCalendar = (habitId) => {
    if (calendarVisibleFor === habitId) {
      setCalendarVisibleFor(null);
    } else {
      setCalendarVisibleFor(habitId);
    }
  };

  const handleToggleDay = (habitId, dateString) => {
    onToggleComplete(habitId, dateString);
  };

  return (
    <div>
      {habits.length === 0 ? (
        <p>No habits added yet.</p>
      ) : (
        habits.map(({ _id, title, category, frequency, completion }) => (
          <div
            key={_id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{title}</strong> <em>({category})</em>
                <p style={{ margin: '0.25rem 0' }}>Frequency: {frequency}</p>
              </div>
              <div>
                <button
                  onClick={() => onDelete(_id)}
                  style={{
                    backgroundColor: '#ff4d4d',
                    border: 'none',
                    borderRadius: '3px',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem',
                    marginRight: '0.5rem',
                  }}
                  aria-label={`Delete habit ${title}`}
                >
                  Delete
                </button>

                <button
                  onClick={() => toggleCalendar(_id)}
                  style={{
                    backgroundColor: '#2196f3',
                    border: 'none',
                    borderRadius: '3px',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem',
                  }}
                  aria-label={`Toggle calendar for habit ${title}`}
                >
                  {calendarVisibleFor === _id ? 'Hide Calendar' : 'View Calendar'}
                </button>
              </div>
            </div>

            {calendarVisibleFor === _id && (
              <HabitCalendar
                completion={completion || []}
                category={category}
                onDateToggle={(date) => handleToggleDay(_id, date)}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default HabitList;






