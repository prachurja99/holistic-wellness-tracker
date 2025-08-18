import React, { useEffect } from 'react';
import JournalEntryForm from '../components/JournalEntryForm';
import JournalEntriesList from '../components/JournalEntriesList';
import { fetchJournals, addJournal, deleteJournal, updateJournal } from '../api/journal';
import '../styles/Journal.css';

const Journal = ({ journals, setJournals }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadJournals = async () => {
      if (token) {
        const res = await fetchJournals(token);
        if (res.success) setJournals(res.journals);
      } else {
        const stored = localStorage.getItem('journals');
        if (stored) setJournals(JSON.parse(stored));
      }
    };
    loadJournals();
  }, [token, setJournals]);

  const reloadJournals = async () => {
    if (token) {
      const res = await fetchJournals(token);
      if (res.success) setJournals(res.journals);
    }
  };

  const handleAddEntry = async (newEntry) => {
    const entryWithDate = { ...newEntry, date: new Date().toISOString() };
    if (token) {
      const res = await addJournal(entryWithDate, token);
      if (res.success) await reloadJournals();
    } else {
      const localEntry = { id: Date.now(), ...entryWithDate };
      setJournals((prev) => [localEntry, ...prev]);
      localStorage.setItem('journals', JSON.stringify([localEntry, ...journals]));
    }
  };

  const handleDeleteEntry = async (id) => {
    if (token) {
      const res = await deleteJournal(id, token);
      if (res.success) await reloadJournals();
    } else {
      const updated = journals.filter((entry) => entry.id !== id);
      setJournals(updated);
      localStorage.setItem('journals', JSON.stringify(updated));
    }
  };

  const handleEditEntry = async (id, updatedData) => {
    const updatedEntry = { ...updatedData, date: new Date().toISOString() };
    if (token) {
      const res = await updateJournal(id, updatedEntry, token);
      if (res.success) await reloadJournals();
    } else {
      const updated = journals.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      );
      setJournals(updated);
      localStorage.setItem('journals', JSON.stringify(updated));
    }
  };

  return (
    <div className="container journal-container">
      <h2>Journal</h2>
      <div className="card">
        <JournalEntryForm onAddEntry={handleAddEntry} />
      </div>
      <JournalEntriesList entries={journals} onDelete={handleDeleteEntry} onEdit={handleEditEntry} />
    </div>
  );
};

export default Journal;








