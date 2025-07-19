// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterLogin from './pages/RegisterLogin';  // Combined Register & Login page
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import HabitTracker from './pages/HabitTracker';
import Journal from './pages/Journal';
import NotFound from './pages/NotFound';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth combined page */}
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/login" element={<RegisterLogin />} />
        <Route path="/register" element={<RegisterLogin />} />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route
          path="/mood-tracker"
          element={
            <PrivateRoute>
              <MoodTracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/habit-tracker"
          element={
            <PrivateRoute>
              <HabitTracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <PrivateRoute>
              <Journal />
            </PrivateRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;












