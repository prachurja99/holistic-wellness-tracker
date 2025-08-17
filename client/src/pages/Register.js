import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import logo from '../assets/470-project-logo.png';
import '../styles/Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(form);
    if (data?.success) {
      setMessage('Registration successful! You can now login.');
      navigate('/login');
    } else {
      setMessage(data?.message || 'Registration failed');
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
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
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
          {message && <div className="auth-message">{message}</div>}
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <div className="auth-alt">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}










