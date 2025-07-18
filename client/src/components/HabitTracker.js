import React, { useState } from 'react';

function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const handleAddHabit = () => {
    if (newHabit.trim() === '') return;
    const habit = {
      id: Date.now(),
      name: newHabit,
      completed: false,
    };
    setHabits([...habits, habit]);
    setNewHabit('');
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Daily Habit Tracker</h2>
      <input
        type="text"
        placeholder="Enter a habit..."
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
      />
      <button onClick={handleAddHabit}>Add Habit</button>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(habit.id)}
            />
            <span
              style={{
                textDecoration: habit.completed ? 'line-through' : 'none',
                marginLeft: '8px',
              }}
            >
              {habit.name}
            </span>
            <button
              onClick={() => deleteHabit(habit.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;

