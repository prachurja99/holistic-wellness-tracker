import React, { useEffect, useState } from 'react';
import {
  fetchGoals,
  createGoal,
  deleteGoalApi,
  markGoalFinished,
  unmarkGoalFinished
} from '../api/goals';
import GoalCompletionChart from '../components/GoalCompletionChart';

const formatDateLocal = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const GoalTracker = () => {
  const token = localStorage.getItem('token');
  const [goals, setGoals] = useState([]);
  const [goalType, setGoalType] = useState('daily');
  const [newGoal, setNewGoal] = useState({ title: '', goalType: 'daily' });
  const [currentDate] = useState(formatDateLocal(new Date()));
  const [finishedGoals, setFinishedGoals] = useState(new Set());

  // Fetch goals when goalType changes
  useEffect(() => {
    if (token) {
      fetchGoals(token, goalType).then(res => {
        if (res.success) {
          setGoals(res.goals);
          setFinishedGoals(new Set()); // in future we can preload finished from API
        }
      });
    }
  }, [goalType, token]);

  // Handle marking & unmarking goal
  const handleFinishToggle = async (goal) => {
    if (!token) return;

    const updatedFinishedGoals = new Set(finishedGoals);
    if (finishedGoals.has(goal._id)) {
      updatedFinishedGoals.delete(goal._id);
      await unmarkGoalFinished(goal._id, currentDate, goalType, token);
    } else {
      updatedFinishedGoals.add(goal._id);
      await markGoalFinished(goal._id, currentDate, goalType, token);
    }
    setFinishedGoals(updatedFinishedGoals);
  };

  // Add new goal
  const handleAddGoal = async () => {
    if (!newGoal.title.trim()) return;
    const res = await createGoal(newGoal, token);
    if (res.success) {
      setGoals(prev => [res.goal, ...prev]);
      setNewGoal({ title: '', goalType });
    }
  };

  // Delete goal
  const handleDelete = async (id) => {
    const res = await deleteGoalApi(id, token);
    if (res.success) {
      setGoals(prev => prev.filter(g => g._id !== id));
      setFinishedGoals(prev => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  };

  return (
    <div className="container">
      <h2>Goal Tracker</h2>

      {/* Goal Type Tabs */}
      <div style={{ marginBottom: '1rem' }}>
        {['daily', 'weekly', 'monthly', 'yearly'].map(type => (
          <button
            key={type}
            onClick={() => setGoalType(type)}
            style={{
              marginRight: '0.5rem',
              backgroundColor: goalType === type ? '#007bff' : '#ccc',
              color: '#fff',
              padding: '0.5rem',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Add Goal */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Goal title"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value, goalType })}
          style={{ padding: '0.4rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleAddGoal}
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add Goal
        </button>
      </div>

      {/* Chart */}
      <GoalCompletionChart goalType={goalType} date={currentDate} token={token} />

      {/* Goal List */}
      <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
        {goals.length > 0 ? (
          goals.map(g => (
            <li
              key={g._id}
              style={{
                background: '#fff',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <label style={{ flex: 1, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={finishedGoals.has(g._id)}
                  onChange={() => handleFinishToggle(g)}
                  style={{ marginRight: '0.5rem' }}
                />
                <strong>{g.title}</strong> ({g.goalType})
              </label>
              <button
                onClick={() => handleDelete(g._id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                X
              </button>
            </li>
          ))
        ) : (
          <li style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
            No goals found for this category. Add one above!
          </li>
        )}
      </ul>
    </div>
  );
};

export default GoalTracker;


