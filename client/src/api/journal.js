const BASE_URL = process.env.REACT_APP_API_URL || '';

export const fetchJournals = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/journal`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  } catch (err) {
    console.error('Error fetching journals:', err);
    return { success: false };
  }
};

export const addJournal = async (entry, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/journal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(entry)
    });
    return await res.json();
  } catch (err) {
    console.error('Error adding journal:', err);
    return { success: false };
  }
};

export const updateJournal = async (id, updatedData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/journal/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error updating journal:', err);
    return { success: false };
  }
};

export const deleteJournal = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/journal/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  } catch (err) {
    console.error('Error deleting journal:', err);
    return { success: false };
  }
};


