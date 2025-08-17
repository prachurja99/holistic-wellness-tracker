import React from 'react';
import '../styles/Dashboard.css'; // Separate CSS for Dashboard styles

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="dashboard-card">
        <h3>Overview</h3>
        <p>Welcome back! Here is a quick summary of your wellness data.</p>
        {/* You can add charts or summaries here */}
      </div>

      <div className="dashboard-card">
        <h3>Recent Habits</h3>
        {/* Insert habit summary component or list */}
      </div>

      <div className="dashboard-card">
        <h3>Recent Mood Logs</h3>
        {/* Insert mood summary component or list */}
      </div>

      <div className="dashboard-card">
        <h3>Recent Journal Entries</h3>
        {/* Insert journal entry previews */}
      </div>
    </div>
  );
};

export default Dashboard;



