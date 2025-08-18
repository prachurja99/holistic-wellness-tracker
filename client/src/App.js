import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

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

const AppLayout = ({ children, user, onLogout, theme, setTheme, reminders }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar user={user} onLogout={onLogout} reminders={reminders} />}
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

  // Shared states for all wellness data
  const [reminders, setReminders] = useState([]);
  const [habits, setHabits] = useState([]);
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (token) {
      getUserProfile(token).then((profile) => setUser(profile || null));

      // Fetch Reminders
      fetch('/api/reminders', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setReminders(data.reminders);
        })
        .catch(() => setReminders([]));

      // Fetch Habits
      fetch('/api/habits', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setHabits(data.habits || []))
        .catch(() => setHabits([]));

      // Fetch Moods
      fetch('/api/moods', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMoods(data.moods || []))
        .catch(() => setMoods([]));

      // Fetch Journals
      fetch('/api/journal', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setJournals(data.entries || []))
        .catch(() => setJournals([]));

      // Fetch Goals
      fetch('/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setGoals(data.goals || []))
        .catch(() => setGoals([]));
    } else {
      setUser(null);
      setReminders([]);
      setHabits([]);
      setMoods([]);
      setJournals([]);
      setGoals([]);
    }
  }, [token]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Notifications effect (optional)
  useEffect(() => {
    if (!('Notification' in window) || reminders.length === 0) return;

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().slice(0, 5); // HH:mm

      reminders.forEach((reminder) => {
        if (
          reminder.enabled &&
          reminder.time === timeStr &&
          reminder.days.includes(now.toLocaleDateString('en-US', { weekday: 'short' }))
        ) {
          new Notification(reminder.title, {
            body: `Reminder: ${reminder.title} at ${reminder.time}`,
          });
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders]);

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

  const handleProfileUpdate = (updatedUser) => setUser(updatedUser);

  const isLoggedIn = isTokenValid(token);

  return (
    <AppLayout user={user} onLogout={handleLogout} theme={theme} setTheme={setTheme} reminders={reminders}>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                habits={habits}
                moods={moods}
                journals={journals}
                goals={goals}
                reminders={reminders}
              />
            }
          />
          <Route path="/habit-tracker" element={<HabitTracker habits={habits} setHabits={setHabits} />} />
          <Route path="/mood-tracker" element={<MoodTracker moods={moods} setMoods={setMoods} />} />
          <Route path="/journal" element={<Journal journals={journals} setJournals={setJournals} />} />
          <Route path="/goals" element={<GoalTracker goals={goals} setGoals={setGoals} reminders={reminders} setReminders={setReminders} />} />
          <Route path="/profile" element={<Profile user={user} onProfileUpdate={handleProfileUpdate} />} />
        </Route>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default App;






























