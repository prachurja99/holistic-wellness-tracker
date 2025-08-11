import axios from 'axios';

const api = axios.create({
  baseURL: '/api' // proxy to http://localhost:5000 (your package.json has proxy)
});

// helper to attach token
const authHeaders = (token) => token ? { Authorization: `Bearer ${token}` } : {};

export const createMood = async (data, token) => {
  try {
    const res = await api.post('/moods', data, { headers: authHeaders(token) });
    return res.data;
  } catch (err) {
    console.error('createMood api error', err?.response?.data || err.message);
    return { success: false, message: err?.response?.data?.message || err.message };
  }
};

export const fetchMoods = async (token) => {
  try {
    const res = await api.get('/moods', { headers: authHeaders(token) });
    return res.data;
  } catch (err) {
    console.error('fetchMoods api error', err?.response?.data || err.message);
    return { success: false, message: err?.response?.data?.message || err.message };
  }
};

export const deleteMoodApi = async (id, token) => {
  try {
    const res = await api.delete(`/moods/${id}`, { headers: authHeaders(token) });
    return res.data;
  } catch (err) {
    console.error('deleteMood api error', err?.response?.data || err.message);
    return { success: false, message: err?.response?.data?.message || err.message };
  }
};
