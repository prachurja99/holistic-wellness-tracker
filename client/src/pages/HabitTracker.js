// src/pages/HabitTracker.js
import React, { useEffect, useState } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);

  // Load habits from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('habits');
    if (stored) setHabits(JSON.parse(stored));
  }, []);

  // Save habits to localStorage when they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = (habit) => {
    const newHabit = { ...habit, completion: habit.completion || [] };
    setHabits([newHabit, ...habits]);
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const handleToggleComplete = (id, dateStr) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id) {
          const completion = habit.completion || [];
          const normalizedDate = new Date(dateStr).toISOString().split('T')[0];

          if (completion.includes(normalizedDate)) {
            // Remove the date (unmark)
            return {
              ...habit,
              completion: completion.filter((d) => d !== normalizedDate),
            };
          } else {
            // Add the date (mark)
            return {
              ...habit,
              completion: [...completion, normalizedDate],
            };
          }
        }
        return habit;
      })
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Habit Tracker</h2>
      <HabitForm onAddHabit={handleAddHabit} />
      <HabitList
        habits={habits}
        onDelete={handleDeleteHabit}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default HabitTracker;





