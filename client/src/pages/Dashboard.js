import React from 'react';

export default function Dashboard({ user, habits, moods, journals, goals, reminders }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 0' }}>
      <h2 style={{ color: '#ff8a65', fontWeight: 'bold', marginBottom: '16px' }}>Dashboard</h2>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Overview</h3>
        <p>Welcome back, {user?.name || 'User'}! Here is a quick summary of your wellness data.</p>
      </div>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Recent Habits</h3>
        <ul style={listStyle}>
          {habits && habits.length > 0
            ? habits.slice(-5).reverse().map(habit => (
                <li key={habit._id || habit.id} style={itemStyle}>
                  <span>{habit.title}</span>
                  {habit.completed && <span style={{ color: '#1bc98e', marginLeft: 8 }}>✔️</span>}
                  <span style={{ color: '#999', marginLeft: 10 }}>
                    {habit.createdAt ? new Date(habit.createdAt).toLocaleDateString() : ''}
                  </span>
                </li>
              ))
            : <li style={itemStyle}>No habits logged.</li>}
        </ul>
      </div>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Recent Mood Logs</h3>
        <ul style={listStyle}>
          {moods && moods.length > 0
            ? moods.slice(-5).reverse().map(mood => (
                <li key={mood._id || mood.id} style={itemStyle}>
                  <span>{mood.mood}</span>
                  <span style={{ color: '#999', marginLeft: 10 }}>
                    {mood.createdAt ? new Date(mood.createdAt).toLocaleDateString() : ''}
                  </span>
                </li>
              ))
            : <li style={itemStyle}>No mood logs.</li>}
        </ul>
      </div>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Recent Journal Entries</h3>
        <ul style={listStyle}>
          {journals && journals.length > 0
            ? journals.slice(-5).reverse().map(journal => (
                <li key={journal._id || journal.id} style={itemStyle}>
                  <span>"{journal.text?.slice(0, 40)}..."</span>
                  <span style={{ color: '#999', marginLeft: 10 }}>
                    {journal.createdAt ? new Date(journal.createdAt).toLocaleDateString() : ''}
                  </span>
                </li>
              ))
            : <li style={itemStyle}>No journals recorded.</li>}
        </ul>
      </div>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Recent Goals</h3>
        <ul style={listStyle}>
          {goals && goals.length > 0
            ? goals.slice(-5).reverse().map(goal => (
                <li key={goal._id || goal.id} style={itemStyle}>
                  <span>{goal.title}</span>
                  <span style={{ color: '#999', marginLeft: 10 }}>
                    {goal.createdAt ? new Date(goal.createdAt).toLocaleDateString() : ''}
                  </span>
                </li>
              ))
            : <li style={itemStyle}>No goals set.</li>}
        </ul>
      </div>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Upcoming Reminders</h3>
        <ul style={listStyle}>
          {reminders && reminders.length > 0
            ? reminders.slice(-5).reverse().map(rem => (
                <li key={rem._id || rem.id} style={itemStyle}>
                  <span>{rem.title} at {rem.time}</span>
                  {rem.date && <span> on {rem.date}</span>}
                  {rem.days?.length > 0 && <span> on {rem.days.join(', ')}</span>}
                </li>
              ))
            : <li style={itemStyle}>No upcoming reminders.</li>}
        </ul>
      </div>
    </div>
  );
}

const sectionStyle = {
  background: '#fff3e7',
  borderRadius: '12px',
  marginBottom: '24px',
  padding: '24px 32px',
  boxShadow: '0 4px 16px #eed',
};
const sectionTitleStyle = {
  color: '#ff8a65',
  marginBottom: '16px',
  fontWeight: 600,
};
const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};
const itemStyle = {
  padding: '8px 0',
  borderBottom: '1px solid #f2d0b8',
  fontSize: '16px',
};






