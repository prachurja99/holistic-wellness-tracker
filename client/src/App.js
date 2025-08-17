import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

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

import { isTokenValid } from './utils/auth';
import { getUserProfile } from './api/auth';

const AppLayout = ({ children, user }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar user={user} />}
      {children}
    </>
  );
};

function App() {
  const token = localStorage.getItem('token');
  const isLoggedIn = isTokenValid(token);

  // Global user state for all components
  const [user, setUser] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {};
  });

  // Loads profile when app starts or token changes
  useEffect(() => {
    async function fetchProfile() {
      if (token) {
        try {
          const profile = await getUserProfile(token);
          if (profile) {
            setUser(profile);
            localStorage.setItem('userProfile', JSON.stringify(profile));
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      }
    }
    fetchProfile();
  }, [token]);

  // Updates state and localStorage after profile change
  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
  };

  return (
    <Router>
      <AppLayout user={user}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/goals" element={<GoalTracker />} />
            <Route path="/profile" element={<Profile onProfileUpdate={handleProfileUpdate} />} />
          </Route>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;























