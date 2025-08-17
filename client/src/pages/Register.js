import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import logo from '../assets/470-project-logo.png';
import '../styles/Auth.css';

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    const data = await registerUser({ name: form.name, email: form.email, password: form.password });
    if (data?.token && data?.user) {
      setMessage('Registration successful!');
      localStorage.setItem('token', data.token);
      if (onLogin) onLogin(data.token); // Notify App to update user state
      navigate('/dashboard');
    } else {
      setMessage(data?.message || 'Registration failed.');
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="auth-input"
            required
          />
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
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="auth-input"
            required
          />
          {message && <div className="auth-message">{message}</div>}
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <div className="auth-alt">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}












