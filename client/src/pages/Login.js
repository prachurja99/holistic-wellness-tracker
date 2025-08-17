import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import logo from '../assets/470-project-logo.png';
import '../styles/Auth.css';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(form);
    if (data?.token && data?.user) {
      setMessage('Login successful!');
      localStorage.setItem('token', data.token);
      if (onLogin) onLogin(data.token);  // Notify App to update user state
      navigate('/dashboard');
    } else {
      setMessage(data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <img
          src={logo}
          alt="Wellnesstic Logo"
          style={{ height: 54, marginBottom: 24, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        />
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          {message && <div className="auth-message">{message}</div>}
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="auth-alt">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}











