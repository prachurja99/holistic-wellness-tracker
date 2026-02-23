import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '';
const API_URL = `${BASE_URL}/api/moods`;

export const fetchMoods = async (token) => {
  try {
    const { data } = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, moods: data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

export const createMood = async (payload, token) => {
  try {
    const { data } = await axios.post(API_URL, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, mood: data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

export const deleteMoodApi = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

