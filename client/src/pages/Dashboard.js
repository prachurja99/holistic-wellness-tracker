import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import MotivationQuote from '../components/MotivationQuote';
import axios from 'axios';

function HeroSection({ user, habits, moods, journals, goals, wellnessLogs }) {
  return (
    <div className="dashboard-hero">
      <div className="dashboard-hero-content">
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <p>
          One place for all your <strong>habits</strong>, <strong>moods</strong>, <strong>journals</strong>, <strong>goals</strong>, and <strong>wellness logs</strong>.
          <br />
          Stay organized, motivated, and mindful every day.
        </p>
        <div className="dashboard-hero-stats">
          <div className="dashboard-hero-stat">
            <div className="stat-number">{habits?.length || 0}</div>
            <div className="stat-label">Habits</div>
          </div>
          <div className="dashboard-hero-stat">
            <div className="stat-number">{moods?.length || 0}</div>
            <div className="stat-label">Mood Logs</div>
          </div>
          <div className="dashboard-hero-stat">
            <div className="stat-number">{journals?.length || 0}</div>
            <div className="stat-label">Journals</div>
          </div>
          <div className="dashboard-hero-stat">
            <div className="stat-number">{goals?.length || 0}</div>
            <div className="stat-label">Goals</div>
          </div>
          <div className="dashboard-hero-stat">
            <div className="stat-number">{wellnessLogs?.length || 0}</div>
            <div className="stat-label">Wellness Logs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ user, habits, moods, journals, goals, reminders, token }) {
  const [wellnessLogs, setWellnessLogs] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get('/api/dashboard/summary', { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          console.log('WellnessLogs response:', data);
          if (data.success) {
            setWellnessLogs(data.wellnessLogs);
          }
        })
        .catch(error => {
          console.error('Error fetching wellness logs:', error);
        });
    }
  }, [token]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <HeroSection 
          user={user} 
          habits={habits} 
          moods={moods} 
          journals={journals} 
          goals={goals} 
          wellnessLogs={wellnessLogs} 
        />
        <MotivationQuote />
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Recent Habits</h3>
            <ul className="dashboard-list">
              {habits && habits.length > 0 ? (
                habits.slice(-5).reverse().map(habit => (
                  <li key={habit._id || habit.id} className="dashboard-list-item">
                    <span>{habit.title}</span>
                    {habit.completed && <span style={{ color: '#1bc98e', marginLeft: 8 }}>✔️</span>}
                    <span className="dashboard-list-date">{habit.createdAt ? new Date(habit.createdAt).toLocaleDateString() : ''}</span>
                  </li>
                ))
              ) : (
                <li className="dashboard-list-item dashboard-empty">No habits logged.</li>
              )}
            </ul>
          </div>

          <div className="dashboard-card">
            <h3>Recent Mood Logs</h3>
            <ul className="dashboard-list">
              {moods && moods.length > 0 ? (
                moods.slice(-5).reverse().map(mood => (
                  <li key={mood._id || mood.id} className="dashboard-list-item">
                    <span>{mood.mood}</span>
                    <span className="dashboard-list-date">{mood.createdAt ? new Date(mood.createdAt).toLocaleDateString() : ''}</span>
                  </li>
                ))
              ) : (
                <li className="dashboard-list-item dashboard-empty">No mood logs.</li>
              )}
            </ul>
          </div>

          <div className="dashboard-card">
            <h3>Recent Journal Entries</h3>
            <ul className="dashboard-list">
              {journals && journals.length > 0 ? (
                journals.slice(-5).reverse().map(journal => (
                  <li key={journal._id || journal.id} className="dashboard-list-item">
                    <span>"{journal.text?.slice(0, 40)}..."</span>
                    <span className="dashboard-list-date">{journal.createdAt ? new Date(journal.createdAt).toLocaleDateString() : ''}</span>
                  </li>
                ))
              ) : (
                <li className="dashboard-list-item dashboard-empty">No journals recorded.</li>
              )}
            </ul>
          </div>

          <div className="dashboard-card">
            <h3>Recent Goals</h3>
            <ul className="dashboard-list">
              {goals && goals.length > 0 ? (
                goals.slice(-5).reverse().map(goal => (
                  <li key={goal._id || goal.id} className="dashboard-list-item">
                    <span>{goal.title}</span>
                    <span className="dashboard-list-date">{goal.createdAt ? new Date(goal.createdAt).toLocaleDateString() : ''}</span>
                  </li>
                ))
              ) : (
                <li className="dashboard-list-item dashboard-empty">No goals set.</li>
              )}
            </ul>
          </div>

          <div className="dashboard-card">
            <h3>Upcoming Reminders</h3>
            <ul className="dashboard-list">
              {reminders && reminders.length > 0 ? (
                reminders.slice(-5).reverse().map(rem => (
                  <li key={rem._id || rem.id} className="dashboard-list-item">
                    <span>{rem.title} at {rem.time}</span>
                    {rem.date && <span> on {rem.date}</span>}
                    {rem.days?.length > 0 && <span> on {rem.days.join(', ')}</span>}
                  </li>
                ))
              ) : (
                <li className="dashboard-list-item dashboard-empty">No upcoming reminders.</li>
              )}
            </ul>
          </div>

          <div className="dashboard-card">
            <h3>Recent Wellness Logs</h3>
            <ul className="dashboard-list">
              {wellnessLogs.length === 0 ? (
                <li className="dashboard-list-item dashboard-empty">No recent wellness logs.</li>
              ) : (
                wellnessLogs.map(log => (
                  <li key={log._id} className="dashboard-list-item">
                    <span>{new Date(log.date).toLocaleDateString()} - {log.type} ({log.duration} min)</span>
                    {log.notes && <span> - {log.notes}</span>}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}













