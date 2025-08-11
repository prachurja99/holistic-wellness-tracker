import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JournalEntryForm from '../components/JournalEntryForm';
import JournalEntriesList from '../components/JournalEntriesList';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch entries from backend on mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/journal', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEntries(res.data.entries || []);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEntries();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Add entry (POST request)
  const addEntry = async (entry) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/journal',
        entry,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setEntries([res.data.entry, ...entries]);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  // Update entry (PUT request)
const editEntry = async (id, updatedEntry) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/journal/${id}`,
      updatedEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    // Update entries state without reload
    setEntries(entries.map(e => (e._id === id ? res.data.entry : e)));
  } catch (error) {
    console.error('Error updating entry:', error);
  }
};


  // Delete entry (DELETE request)
  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/journal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEntries(entries.filter(e => e._id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  // Filter entries by search term
  const filteredEntries = entries.filter(entry =>
    entry.title?.toLowerCase().includes(search.toLowerCase()) ||
    entry.content?.toLowerCase().includes(search.toLowerCase()) ||
    (entry.tag && entry.tag.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return <p>Loading your journal entries...</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Journal</h2>
      <input
        type="text"
        placeholder="Search entries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <JournalEntryForm onAddEntry={addEntry} />
      <JournalEntriesList entries={filteredEntries} onDelete={deleteEntry} />
    </div>
  );
};

export default Journal;
