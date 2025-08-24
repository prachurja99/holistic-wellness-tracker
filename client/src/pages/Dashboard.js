import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import MotivationQuote from '../components/MotivationQuote';
import axios from 'axios';

function HeroSection({ user, habits, moods, journals, goals, wellnessStats }) {
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
            <div className="stat-number">{wellnessStats?.totalWellnessLogs || 0}</div>
            <div className="stat-label">Wellness Logs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user, token }) {
  const [habits, setHabits] = useState([]);
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [wellnessLogs, setWellnessLogs] = useState([]);
  const [wellnessStats, setWellnessStats] = useState({
    totalWellnessLogs: 0,
    totalExercises: 0,
    totalMeditations: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('/api/dashboard/summary', { headers });
        if (response.data.success) {
          setHabits(response.data.recentHabits || []);
          setMoods(response.data.recentMoods || []);
          setJournals(response.data.recentJournals || []);
          setGoals(response.data.recentGoals || []);
          setWellnessLogs(response.data.wellnessLogs || []);
          setWellnessStats({
            totalWellnessLogs: response.data.totalWellnessLogs || 0,
            totalExercises: response.data.totalExercises || 0,
            totalMeditations: response.data.totalMeditations || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Helper to identify log type for wellness logs
  const getLogType = (log) => {
    return log.type && ['Running', 'Yoga', 'Weights', 'Cycling', 'Swimming'].includes(log.type)
      ? 'Exercise'
      : 'Meditation';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <HeroSection
          user={user}
          habits={habits}
          moods={moods}
          journals={journals}
          goals={goals}
          wellnessStats={wellnessStats}
        />
        <MotivationQuote />

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Recent Habits</h3>
            <ul className="dashboard-list">
              {habits.length > 0 ? (
                habits.slice(0, 5).map((habit) => (
                  <li key={habit._id || habit.id} className="dashboard-list-item">
                    <span>{habit.title}</span>
                    {habit.completed && (
                      <span style={{ color: '#1bc98e', marginLeft: 8 }}>✔️</span>
                    )}
                    <span className="dashboard-list-date">
                      {habit.createdAt ? new Date(habit.createdAt).toLocaleDateString() : ''}
                    </span>
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
              {moods.length > 0 ? (
                moods.slice(0, 5).map((mood) => (
                  <li key={mood._id || mood.id} className="dashboard-list-item">
                    <span>{mood.mood}</span>
                    <span className="dashboard-list-date">
                      {mood.createdAt ? new Date(mood.createdAt).toLocaleDateString() : ''}
                    </span>
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
              {journals.length > 0 ? (
                journals.slice(0, 5).map((journal) => (
                  <li key={journal._id || journal.id} className="dashboard-list-item">
                    <span>"{journal.text?.slice(0, 40)}..."</span>
                    <span className="dashboard-list-date">
                      {journal.createdAt ? new Date(journal.createdAt).toLocaleDateString() : ''}
                    </span>
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
              {goals.length > 0 ? (
                goals.slice(0, 5).map((goal) => (
                  <li key={goal._id || goal.id} className="dashboard-list-item">
                    <span>{goal.title}</span>
                    <span className="dashboard-list-date">
                      {goal.createdAt ? new Date(goal.createdAt).toLocaleDateString() : ''}
                    </span>
                  </li>
                ))
              ) : (
                <li className="dashboard-list-item dashboard-empty">No goals set.</li>
              )}
            </ul>
          </div>

          <div className="dashboard-card">
            <h3>Recent Wellness Logs</h3>
            <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
              {wellnessStats.totalExercises} Exercises • {wellnessStats.totalMeditations} Meditations
            </div>
            <ul className="dashboard-list">
              {wellnessLogs.length === 0 ? (
                <li className="dashboard-list-item dashboard-empty">No recent wellness logs.</li>
              ) : (
                wellnessLogs.map((log) => (
                  <li key={log._id} className="dashboard-list-item">
                    <span>
                      <strong>[{getLogType(log)}]</strong> {new Date(log.date).toLocaleDateString()} - {log.type} ({log.duration} min)
                      {log.notes && ` - ${log.notes.slice(0, 25)}${log.notes.length > 25 ? '...' : ''}`}
                    </span>
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

export default Dashboard;














