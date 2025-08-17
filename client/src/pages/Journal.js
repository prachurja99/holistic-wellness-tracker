import React, { useEffect, useState } from 'react';
import { fetchJournals, addJournal, updateJournal, deleteJournal } from '../api/journal';
import JournalEntryForm from '../components/JournalEntryForm';
import JournalEntriesList from '../components/JournalEntriesList';
import '../styles/Journal.css';  // Import new CSS

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        setLoading(true);
        const res = await fetchJournals(token);
        setLoading(false);
        if (res.success) {
          setEntries(res.journals);
          localStorage.setItem('journalEntries', JSON.stringify(res.journals));
        } else {
          console.warn('Backend fetch failed, using localStorage fallback');
          const stored = localStorage.getItem('journalEntries');
          if (stored) setEntries(JSON.parse(stored));
        }
      } else {
        const stored = localStorage.getItem('journalEntries');
        if (stored) setEntries(JSON.parse(stored));
      }
    };
    loadData();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = async (newEntry) => {
    const entryWithDate = { ...newEntry, date: new Date().toISOString() };
    if (token) {
      const res = await addJournal(entryWithDate, token);
      if (res.success) {
        setEntries((prev) => [res.journal, ...prev]);
      }
    } else {
      const localEntry = { id: Date.now(), ...entryWithDate };
      setEntries((prev) => [localEntry, ...prev]);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (token) {
      const res = await deleteJournal(id, token);
      if (res.success) {
        setEntries((prev) => prev.filter((entry) => (entry._id || entry.id) !== id));
      }
    } else {
      setEntries((prev) => prev.filter((entry) => (entry.id) !== id));
    }
  };

  const handleEditEntry = async (id, updatedData) => {
    const updatedEntry = { ...updatedData, date: new Date().toISOString() };
    if (token) {
      const res = await updateJournal(id, updatedEntry, token);
      if (res.success) {
        setEntries((prev) =>
          prev.map((entry) =>
            (entry._id || entry.id) === id ? res.journal : entry
          )
        );
      }
    } else {
      setEntries((prev) =>
        prev.map((entry) =>
          (entry._id || entry.id) === id ? { ...entry, ...updatedEntry } : entry
        )
      );
    }
  };

  return (
    <div className="container journal-container">
      <h2>Journal</h2>

      <div className="card">
        <JournalEntryForm onAddEntry={handleAddEntry} />
      </div>

      {loading ? (
        <p className="loading-text">Loading journal entries...</p>
      ) : (
        <JournalEntriesList
          entries={entries}
          onDelete={handleDeleteEntry}
          onEdit={handleEditEntry}
        />
      )}
    </div>
  );
};

export default Journal;




