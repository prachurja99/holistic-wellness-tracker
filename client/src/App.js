import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

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

const AppLayout = ({ children, user, onLogout }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar user={user} onLogout={onLogout} />}
      {children}
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  // When token changes, fetch latest profile
  useEffect(() => {
    if (token) {
      getUserProfile(token).then((profile) => setUser(profile || null));
    } else {
      setUser(null);
    }
  }, [token]);

  // This function is called by Navbar or wherever you want to log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    navigate('/login');
  };

  // To be called by Login/Register on successful login
  const handleLogin = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    // The effect above will fetch the profile automatically
  };

  // Called by Profile after update
  const handleProfileUpdate = (updatedUser) => setUser(updatedUser);

  const isLoggedIn = isTokenValid(token);

  return (
    <AppLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
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
  );
}

export default App;


























