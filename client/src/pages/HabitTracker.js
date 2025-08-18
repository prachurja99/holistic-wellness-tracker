import React, { useState, useEffect } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import { fetchHabits, addHabit, deleteHabit, toggleCompletion } from '../api/habits';
import '../styles/HabitTracker.css';

const HabitTracker = ({ habits, setHabits }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadHabits = async () => {
      if (token) {
        const res = await fetchHabits(token);
        if (res.success) setHabits(res.habits);
      } else {
        const stored = localStorage.getItem('habits');
        if (stored) setHabits(JSON.parse(stored));
      }
    };
    loadHabits();
  }, [token, setHabits]);

  const reloadHabits = async () => {
    if (token) {
      const res = await fetchHabits(token);
      if (res.success) setHabits(res.habits);
    }
  };

  const handleAddHabit = async (habit) => {
    if (token) {
      setLoading(true);
      const res = await addHabit(habit, token);
      setLoading(false);
      if (res.success) await reloadHabits();
    } else {
      const localHabit = { id: Date.now(), ...habit };
      setHabits((prev) => [localHabit, ...prev]);
      localStorage.setItem('habits', JSON.stringify([localHabit, ...habits]));
    }
  };

  const handleDeleteHabit = async (id) => {
    if (token) {
      setLoading(true);
      const res = await deleteHabit(id, token);
      setLoading(false);
      if (res.success) await reloadHabits();
    } else {
      const updated = habits.filter((h) => h.id !== id);
      setHabits(updated);
      localStorage.setItem('habits', JSON.stringify(updated));
    }
  };

  const handleToggleComplete = async (id, date) => {
    if (token) {
      const res = await toggleCompletion(id, date, token);
      if (res.success) await reloadHabits();
    } else {
      setHabits((prev) =>
        prev.map((habit) => {
          if (habit.id === id) {
            const completion = habit.completion || [];
            if (completion.includes(date)) {
              return { ...habit, completion: completion.filter((d) => d !== date) };
            } else {
              return { ...habit, completion: [...completion, date] };
            }
          }
          return habit;
        })
      );
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  };

  return (
    <div className="container habittracker-container">
      <h2>Habit Tracker</h2>
      <div className="card">
        <HabitForm onAddHabit={handleAddHabit} />
      </div>
      {loading ? (
        <p className="loading-text">Loading habits...</p>
      ) : (
        <div className="card">
          <HabitList habits={habits} onDelete={handleDeleteHabit} onToggleComplete={handleToggleComplete} />
        </div>
      )}
    </div>
  );
};

export default HabitTracker;















