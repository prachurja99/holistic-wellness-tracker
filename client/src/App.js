import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import HabitTracker from './pages/HabitTracker';
import Journal from './pages/Journal';
import GoalTracker from './pages/GoalTracker';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';

import { isTokenValid } from './utils/auth';
import { getUserProfile } from './api/auth';
import ExerciseMeditationLog from './pages/ExerciseMeditationLog';

const AppLayout = ({ children, user, onLogout, theme, setTheme, reminders }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar user={user} onLogout={onLogout} />}
      {!hideNavbar && <ThemeSelector theme={theme} setTheme={setTheme} />}
      {children}
    </>
  );
};

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Shared states for wellness data
  const [reminders, setReminders] = useState([]);
  const [habits, setHabits] = useState([]);
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (token) {
      getUserProfile(token)
        .then(profile => setUser(profile || null))
        .catch(() => setUser(null));

      // Fetch Reminders, Habits, Moods, Journals, Goals with error handling
      // Your existing fetch logic here ...
    } else {
      setUser(null);
      setReminders([]);
      setHabits([]);
      setMoods([]);
      setJournals([]);
      setGoals([]);
    }
  }, [token]);

  // Update the data-theme attribute on document element and save in localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setReminders([]);
    setHabits([]);
    setMoods([]);
    setJournals([]);
    setGoals([]);
    navigate('/login');
  };

  const handleLogin = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  const isLoggedIn = isTokenValid(token);

  return (
    <AppLayout user={user} onLogout={handleLogout} theme={theme} setTheme={setTheme} reminders={reminders}>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard user={user} habits={habits} moods={moods} journals={journals} goals={goals} reminders={reminders} />} />
          <Route path="/habit-tracker" element={<HabitTracker habits={habits} setHabits={setHabits} />} />
          <Route path="/mood-tracker" element={<MoodTracker moods={moods} setMoods={setMoods} />} />
          <Route path="/journal" element={<Journal journals={journals} setJournals={setJournals} />} />
          <Route path="/goals" element={<GoalTracker goals={goals} setGoals={setGoals} reminders={reminders} setReminders={setReminders} theme={theme} token={token} />} />
          <Route path="/profile" element={<Profile user={user} onProfileUpdate={setUser} />} />

          {/* New combined Exercise & Meditation Logs page */}
          <Route path="/wellness-logs" element={<ExerciseMeditationLog token={token} />} />
        </Route>

        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

































