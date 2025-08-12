export const fetchGoals = async (token, goalType) => {
  try {
    let url = '/api/goals';
    if (goalType) url += `?goalType=${goalType}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const createGoal = async (goalData, token) => {
  try {
    const res = await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(goalData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const updateGoal = async (id, goalData, token) => {
  try {
    const res = await fetch(`/api/goals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(goalData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const deleteGoalApi = async (id, token) => {
  try {
    const res = await fetch(`/api/goals/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};
export const markGoalFinished = async (goalId, date, goalType, token) => {
  try {
    const res = await fetch('/api/goals/finish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ goalId, date, goalType }),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};
export const fetchGoalStats = async (goalType, date, token) => {
  try {
    const res = await fetch(`/api/goals/stats?goalType=${goalType}&date=${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};
export const unmarkGoalFinished = async (goalId, date, goalType, token) => {
  try {
    const res = await fetch('/api/goals/unfinish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ goalId, date, goalType }),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
};




