import React, { useEffect, useState } from 'react';
import {
  fetchGoals,
  fetchFinishedGoals,
  create,
  remove,
  markFinished,
  unmarkFinished,
  fetchGoalStats,
} from '../api/goals';
import GoalCompletionChart from '../components/GoalCompletionChart';
import ReminderForm from '../components/ReminderForm';
import '../styles/GoalTracker.css';

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

function GoalTracker({ goals, setGoals, reminders, setReminders, theme, token }) {
  const [finishedGoals, setFinishedGoals] = useState([]);
  const [viewType, setViewType] = useState('daily');
  const [newGoal, setNewGoal] = useState({ title: '', goalType: 'daily' });
  const [stats, setStats] = useState({ total: 0, finished: 0, unfinished: 0 });
  const currentDate = formatDate(new Date());

  // Fetch goals, stats, and reminders
  const loadGoalsAndStats = async () => {
    if (!token) return;
    try {
      if (viewType === 'finished') {
        const results = await Promise.all(
          ['daily', 'weekly', 'monthly', 'yearly'].map((type) =>
            fetchFinishedGoals(token, type, currentDate)
          )
        );
        const combined = results
          .filter((res) => res.success && Array.isArray(res.goals))
          .flatMap((res) => res.goals);
        setFinishedGoals(combined);
        setStats({ total: 0, finished: 0, unfinished: 0 });
      } else {
        const activeRes = await fetchGoals(token, viewType, currentDate);
        if (activeRes.success) setGoals(activeRes.goals);
        const statsRes = await fetchGoalStats(viewType, currentDate, token);
        if (statsRes.success)
          setStats({
            total: statsRes.total,
            finished: statsRes.finished,
            unfinished: statsRes.unfinished,
          });
      }

      const res = await fetch('/api/reminders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setReminders(data.reminders);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadGoalsAndStats();
    setNewGoal({ title: '', goalType: viewType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewType, token, currentDate]);

  const handleAdd = async () => {
    if (!newGoal.title.trim()) return;
    const toCreate = { ...newGoal, goalType: viewType === 'finished' ? 'daily' : viewType };
    const res = await create(toCreate, token);
    if (res.success) {
      await loadGoalsAndStats();
      setNewGoal({ title: '', goalType: viewType });
    }
  };

  const handleDelete = async (id) => {
    const res = await remove(id, token);
    if (res.success) {
      await loadGoalsAndStats();
    }
  };

  const toggleComplete = async (goal) => {
    if (!token) return;
    if (goal.status === 'completed') {
      await unmarkFinished(goal._id, currentDate, goal.goalType, token);
    } else {
      await markFinished(goal._id, currentDate, goal.goalType, token);
    }
    await loadGoalsAndStats();
  };

  const handleCreateReminder = async (goalId, reminderData) => {
    try {
      const payload = {
        ...reminderData,
        type: 'goal',
        goalId,
      };
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setReminders((prev) => [data.reminder, ...prev]);
        alert('Reminder set!');
      } else {
        alert('Failed to create reminder');
      }
    } catch (error) {
      console.error('Failed to create reminder:', error);
    }
  };

  const remindersForGoal = (goalId) => (reminders || []).filter((r) => r.goalId === goalId);

  const displayedGoals = viewType === 'finished' ? finishedGoals : goals;

  return (
    <div className="goaltracker-wrapper-full">
      <aside className="goaltracker-sidebar-full">
        {['daily', 'weekly', 'monthly', 'yearly', 'finished'].map((type) => (
          <button
            key={type}
            className={viewType === type ? 'goaltracker-sidebar-btn active' : 'goaltracker-sidebar-btn'}
            onClick={() => setViewType(type)}
          >
            {type === 'finished' ? 'Finished Tasks' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </aside>
      <main className="goaltracker-main-full">
        <h2>{viewType === 'finished' ? 'Finished Tasks' : `${viewType.charAt(0).toUpperCase() + viewType.slice(1)} Goals`}</h2>
        {viewType !== 'finished' && (
          <>
            <div className="goaltracker-add">
              <input
                type="text"
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="goaltracker-input"
              />
              <button onClick={handleAdd} className="goaltracker-btn-add">Add Goal</button>
            </div>
            <GoalCompletionChart goalType={viewType} date={currentDate} token={token} theme={theme} />
          </>
        )}
        <ul className="goaltracker-list">
          {displayedGoals.length > 0 ? (
            displayedGoals.map((g) => (
              <li key={g._id} className="goaltracker-item">
                <label className="goaltracker-label">
                  <input
                    type="checkbox"
                    checked={g.status === 'completed'}
                    onChange={() => toggleComplete(g)}
                    disabled={viewType === 'finished'}
                    className="goaltracker-checkbox"
                  />
                  <strong>{g.title}</strong> ({g.goalType})
                </label>
                {viewType !== 'finished' && (
                  <button onClick={() => handleDelete(g._id)} className="goaltracker-btn-delete" aria-label="Delete goal">
                    ×
                  </button>
                )}
                {viewType !== 'finished' && (
                  <ReminderForm onCreate={(reminderData) => handleCreateReminder(g._id, reminderData)} initialTitle={g.title} />
                )}
                <ul className="goaltracker-reminders-list">
                  {remindersForGoal(g._id).map((rem) => (
                    <li key={rem._id}>
                      🔔 {rem.repeat
                        ? `Repeats on ${rem.days.join(', ')} at ${rem.time}`
                        : `On ${rem.date} at ${rem.time}`}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <li className="goaltracker-empty">No goals found for this category.</li>
          )}
        </ul>
      </main>
    </div>
  );
}

export default GoalTracker;




















