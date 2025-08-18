import React, { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ReminderForm({ onCreate, initialTitle = '', initialTime = '08:00' }) {
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(initialTime);
  const [repeat, setRepeat] = useState(false);
  const [days, setDays] = useState([]);

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter a title');
    if (!time) return alert('Please select a time');
    if (!repeat && !date) return alert('Pick a date for one-time reminder');
    if (repeat && days.length === 0) return alert('Select repeat days');
    onCreate({
      title,
      time,
      days: repeat ? days : [],
      date: repeat ? undefined : date,  // IMPORTANT: include date here for one-time reminders
      enabled: true,
      repeat,
    });
    setTitle('');
    setDate('');
    setTime('08:00');
    setRepeat(false);
    setDays([]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Reminder Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: '0.5rem', marginRight: '0.5rem', width: '180px' }}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        style={{ padding: '0.5rem', marginRight: '0.5rem', width: '110px' }}
      />
      <label style={{ marginRight: '1rem' }}>
        <input type="checkbox" checked={repeat} onChange={() => setRepeat(r => !r)} />
        Repeat
      </label>
      {repeat ? (
        <div style={{ display: 'inline-block', marginRight: '0.5rem' }}>
          {daysOfWeek.map((day) => (
            <label key={day} style={{ marginRight: '0.5rem' }}>
              <input
                type="checkbox"
                checked={days.includes(day)}
                onChange={() => toggleDay(day)}
              />
              {day}
            </label>
          ))}
        </div>
      ) : (
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
      )}
      <button type="submit" style={{ padding: '0.5rem 1rem' }}>Add Reminder</button>
    </form>
  );
}


