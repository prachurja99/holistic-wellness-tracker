import axios from 'axios';

const API_URL = '/api/meditations';

export const getMeditations = (token) => {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export const addMeditation = (meditationData, token) => {
  return axios.post(API_URL, meditationData, { headers: { Authorization: `Bearer ${token}` } });
};
