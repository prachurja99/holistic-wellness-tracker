import axios from 'axios';

const API_URL = '/api/exercises';

export const getExercises = (token) => {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export const addExercise = (exerciseData, token) => {
  return axios.post(API_URL, exerciseData, { headers: { Authorization: `Bearer ${token}` } });
};
