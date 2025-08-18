import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/470-project-logo.png';
import '../styles/Navbar.css';
import RemindersPanel from './RemindersPanel';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [reminders, setReminders] = useState([]);
  const [showReminders, setShowReminders] = useState(false);
  const panelRef = useRef();

  // Fetch reminders on mount
  useEffect(() => {
    if (!isLoggedIn) return;
    fetch('/api/reminders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReminders(data.reminders);
      });
  }, [isLoggedIn]);

  // Close reminders panel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowReminders(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteReminder = (id) => {
    fetch(`/api/reminders/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReminders(reminders.filter((r) => r._id !== id));
        }
      });
  };

  const unreadCount = reminders.filter((r) => r.enabled).length;

  const handleLogout = () => {
    localStorage.clear();
    if (onLogout) onLogout();
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
        position: 'relative',
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/dashboard">
          <img
            src={logo}
            alt="Wellnesstic Logo"
            style={{ height: '40px', verticalAlign: 'middle' }}
          />
        </Link>

        {/* Center: Nav links */}
        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/habit-tracker" className="nav-link">Habit Tracker</Link>
            <Link to="/mood-tracker" className="nav-link">Mood Tracker</Link>
            <Link to="/journal" className="nav-link">Journal</Link>
            <Link to="/goals" className="nav-link">Goals</Link>
          </>
        )}
      </div>

      {/* Right: Notifications, User & Logout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
        }}
      >
        {isLoggedIn && (
          <>
            <div
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => setShowReminders(!showReminders)}
              aria-label="Show reminders"
              title="Reminders"
            >
              <span style={{ fontSize: '24px' }}>🔔</span>
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
            {showReminders && (
              <div
                ref={panelRef}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '64px',
                  width: '320px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: '4px',
                  zIndex: 1000,
                }}
              >
                <RemindersPanel reminders={reminders} onDelete={handleDeleteReminder} />
              </div>
            )}
            <span style={{ marginRight: 8 }}>
              Hi, {user?.name || user?.email || 'User'}
            </span>
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  marginRight: 8,
                }}
              />
            ) : (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#ccc',
                  marginRight: 8,
                }}
              />
            )}
            <button onClick={() => navigate('/profile')} className="nav-btn-profile">
              Profile
            </button>
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










