import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // 1️⃣ Remove auth token
    localStorage.removeItem('token');

    // 2️⃣ Clear any saved app state in localStorage
    localStorage.removeItem('userProfile');
    localStorage.removeItem('goals');
    localStorage.removeItem('moods');
    localStorage.removeItem('habits');
    localStorage.removeItem('journal');

    // 3️⃣ Optional: Clear session storage too
    sessionStorage.clear();

    // 4️⃣ Call any extra cleanup logic from parent if passed
    if (onLogout) onLogout();

    // 5️⃣ Redirect to login
    navigate('/login', { replace: true });
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    display: 'block'
  };

  return (
    <nav style={{ backgroundColor: '#657786', padding: '0.5rem 0' }}>
      <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
        {isLoggedIn && (
          <>
            <li><Link style={linkStyle} to="/dashboard">Dashboard</Link></li>
            <li><Link style={linkStyle} to="/mood-tracker">Mood</Link></li>
            <li><Link style={linkStyle} to="/habit-tracker">Habits</Link></li>
            <li><Link style={linkStyle} to="/journal">Journal</Link></li>
            <li><Link style={linkStyle} to="/goals">Goals</Link></li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem'
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li><Link style={linkStyle} to="/login">Login</Link></li>
            <li><Link style={linkStyle} to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


