// src/pages/Journal.js
import React, { useEffect, useState } from 'react';
import { fetchJournals, addJournal, updateJournal, deleteJournal } from '../api/journal';
import JournalEntryForm from '../components/JournalEntryForm';
import JournalEntriesList from '../components/JournalEntriesList';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  // Load entries from backend or localStorage
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

  // Keep local storage updated
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  // Add new entry
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

  // Delete entry
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

  // Edit entry
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
    <div className="container">
      <h2>Journal</h2>
      
      {/* Form to add new entry */}
      <div className="card">
        <JournalEntryForm onAddEntry={handleAddEntry} />
      </div>

      {loading ? (
        <p>Loading journal entries...</p>
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



