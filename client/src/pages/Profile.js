import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api/auth';

function Profile({ onProfileUpdate }) {
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({ name: '', email: '', about: '', profileImage: '' });
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getUserProfile(token);
      if (data) {
        setForm({
          name: data.name || '',
          email: data.email || '',
          about: data.about || '',
          profileImage: data.profileImage || ''
        });
        setPreview(data.profileImage || '');
      }
    }
    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm(prev => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting profile update:', form);
    const data = await updateUserProfile(token, form);
    console.log('Profile update response:', data);
    if (data?.success) {
      setMessage('Profile updated successfully!');
      const freshProfile = await getUserProfile(token);
      setForm({
        name: freshProfile.name || '',
        email: freshProfile.email || '',
        about: freshProfile.about || '',
        profileImage: freshProfile.profileImage || ''
      });
      setPreview(freshProfile.profileImage || '');
      if (typeof onProfileUpdate === 'function') onProfileUpdate(freshProfile);
      // IMPORTANT: Do NOT store full profile with base64 image in localStorage here!
    } else {
      setMessage(data?.message || 'Profile update failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input name="name" value={form.name} onChange={handleChange} required /><br /><br />

        <label>Email:</label><br />
        <input name="email" value={form.email} onChange={handleChange} required /><br /><br />

        <label>About You:</label><br />
        <textarea name="about" value={form.about} onChange={handleChange} /><br /><br />

        <label>Profile Picture:</label><br />
        <input type="file" accept="image/*" onChange={handleFileChange} /><br /><br />

        {preview && (
          <img src={preview} alt="Profile Preview" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }} />
        )}<br /><br />

        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: 4 }}>
          Update
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;










