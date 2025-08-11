// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api/auth';

export default function Profile() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile(token);
      if (data?.name) {
        setForm({ name: data.name, email: data.email });
      } else {
        setMessage(data?.message || 'Failed to load profile');
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await updateUserProfile(token, form);
    if (data?.success || data?.name) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage(data?.message || 'Profile update failed');
    }
  };

  return (
    <div>
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <input name="email" value={form.email} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
