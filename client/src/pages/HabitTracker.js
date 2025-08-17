import React, { useEffect, useState } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import { fetchHabits, addHabit, deleteHabit, toggleCompletion } from '../api/habits';
import '../styles/HabitTracker.css';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadHabits = async () => {
      if (token) {
        setLoading(true);
        const res = await fetchHabits(token);
        setLoading(false);
        if (res.success) {
          setHabits(res.habits);
          localStorage.setItem('habits', JSON.stringify(res.habits));
        } else {
          console.warn('Habit fetch failed, using local cache');
          const stored = localStorage.getItem('habits');
          if (stored) setHabits(JSON.parse(stored));
        }
      } else {
        const stored = localStorage.getItem('habits');
        if (stored) setHabits(JSON.parse(stored));
      }
    };
    loadHabits();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = async (habit) => {
    if (token) {
      const res = await addHabit(habit, token);
      if (res.success) setHabits((prev) => [res.habit, ...prev]);
    } else {
      const localHabit = { id: Date.now(), ...habit };
      setHabits((prev) => [localHabit, ...prev]);
    }
  };

  const handleDeleteHabit = async (id) => {
    if (token) {
      const res = await deleteHabit(id, token);
      if (res.success) setHabits((prev) => prev.filter((h) => h._id !== id && h.id !== id));
    } else {
      setHabits((prev) => prev.filter((h) => h.id !== id));
    }
  };

  const handleToggleComplete = async (id, date) => {
    if (token) {
      const res = await toggleCompletion(id, date, token);
      if (res.success) {
        setHabits((prev) => prev.map((h) => (h._id === id ? res.habit : h)));
      }
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
          <HabitList
            habits={habits}
            onDelete={handleDeleteHabit}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      )}
    </div>
  );
};

export default HabitTracker;









