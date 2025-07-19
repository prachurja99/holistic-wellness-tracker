import React, { useState, useEffect } from 'react';
import JournalEntryForm from '../components/JournalEntryForm';
import JournalEntriesList from '../components/JournalEntriesList';

const Journal = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('journalEntries');
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Journal</h2>
      <JournalEntryForm onAddEntry={addEntry} />
      <JournalEntriesList entries={entries} onDelete={deleteEntry} />
    </div>
  );
};

export default Journal;

