const BASE_URL = process.env.REACT_APP_API_URL || '';

export const fetchGoals = async (token, goalType, date) => {
  try {
    let url = `${BASE_URL}/api/goals`;
    if (goalType && date) {
      url += `?goalType=${goalType}&date=${date}`;
    } else if (goalType) {
      url += `?goalType=${goalType}`;
    }
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const fetchFinishedGoals = async (token, goalType, date) => {
  try {
    let url = `${BASE_URL}/api/goals/finished`;
    if (goalType && date) {
      url += `?goalType=${goalType}&date=${date}`;
    } else if (goalType) {
      url += `?goalType=${goalType}`;
    }
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const create = async (data, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const update = async (id, data, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/goals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const remove = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/goals/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const markFinished = async (goalId, date, goalType, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/goals/finish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ goalId, date, goalType }),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const unmarkFinished = async (goalId, date, goalType, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/goals/unfinish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ goalId, date, goalType }),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const fetchGoalStats = async (goalType, date, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/goals/stats?goalType=${goalType}&date=${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};









