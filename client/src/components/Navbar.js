import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/470-project-logo.png';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    if (onLogout) onLogout(); // Call provided logout handler to clear state in parent App
    navigate('/login', { replace: true });
  };

  return (
    <nav
      className="navbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '64px',
        background: '#fff',
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/dashboard">
          <img
            src={logo}
            alt="Wellnesstic Logo"
            style={{ height: '40px', verticalAlign: 'middle' }}
          />
        </Link>
      </div>

      {/* Center: Nav links */}
      <ul
        className="nav-list"
        style={{ display: 'flex', gap: '20px', margin: 0, padding: 0, listStyleType: 'none' }}
      >
        {isLoggedIn ? (
          <>
            <li>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/mood-tracker">
                Mood
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/habit-tracker">
                Habits
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/journal">
                Journal
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/goals">
                Goals
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Right: User & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isLoggedIn && (
          <>
            <span style={{ marginRight: 8 }}>
              Hi, {user?.name || user?.email || 'User'}
            </span>
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
              />
            ) : (
              <div
                style={{ width: 32, height: 32, borderRadius: '50%', background: '#ccc', marginRight: 8 }}
              />
            )}
            <button onClick={() => navigate('/profile')}>Profile</button>
            <button onClick={handleLogout} className="nav-btn-logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;








