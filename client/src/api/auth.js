import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: `${BASE_URL}/api/auth`
});

const authHeaders = (token) =>
  token ? { Authorization: `Bearer ${token}` } : {};

export const registerUser = async (userData) => {
  try {
    const res = await api.post('/register', userData);
    return res.data;
  } catch (err) {
    console.error('Register API error', err?.response?.data || err.message);
    return { success: false, message: err?.response?.data?.message || err.message };
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await api.post('/login', userData);
    return res.data;
  } catch (err) {
    console.error('Login API error', err?.response?.data || err.message);
    return { success: false, message: err?.response?.data?.message || err.message };
  }
};

export const getUserProfile = async (token) => {
  try {
    const res = await api.get('/profile', { headers: authHeaders(token) });
    return res.data;
  } catch (err) {
    console.error('Profile API error', err?.response?.data || err.message);
    return { success: false, message: err?.response?.data?.message || err.message };
  }
};

export const updateUserProfile = async (token, updatedData) => {
  try {
    const res = await api.put('/profile', updatedData, { headers: authHeaders(token) });
    return res.data;
  } catch (err) {
    console.error('Update Profile API error', err?.response?.data || err.message);
    return { success: false, message: err?.response?.data?.message || err.message };
  }
};




