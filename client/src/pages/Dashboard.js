// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to your Dashboard</h2>
      <p>You are logged in.</p>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/home')} style={{ marginRight: '1rem' }}>
          Home
        </button>
        <button onClick={() => navigate('/mood-tracker')} style={{ marginRight: '1rem' }}>
          Mood Tracker
        </button>
        <button onClick={() => navigate('/journal')} style={{ marginRight: '1rem' }}>
          Journal
        </button>
        <button onClick={() => navigate('/habit-tracker')} style={{ marginRight: '1rem' }}>
          Habit Tracker
        </button>
      </div>

      <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

