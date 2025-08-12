import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import HabitTracker from './pages/HabitTracker';
import Journal from './pages/Journal';
import GoalTracker from './pages/GoalTracker';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

import './App.css';

// Layout Wrapper → hides navbar on login/register pages
const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/goals" element={<GoalTracker />} />
          </Route>

          {/* DEFAULT — redirect based on login */}
          <Route path="/" element={
            isLoggedIn 
              ? <Navigate to="/dashboard" replace /> 
              : <Navigate to="/login" replace />
          } />

          {/* 404 PAGE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;

















