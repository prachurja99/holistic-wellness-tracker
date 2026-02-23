import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '';
const API_URL = `${BASE_URL}/api/habits`;

export const fetchHabits = async (token) => {
  try {
    const { data } = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, habits: data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

export const addHabit = async (habit, token) => {
  try {
    const { data } = await axios.post(API_URL, habit, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, habit: data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

export const deleteHabit = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

export const toggleCompletion = async (id, date, token) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/${id}/complete`,
      { date },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { success: true, habit: data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};
