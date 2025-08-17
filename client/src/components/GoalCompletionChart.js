// client/src/components/GoalCompletionChart.js
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { fetchGoalStats } from '../api/goals';

// Register required chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const GoalCompletionChart = ({ goalType, date, token }) => {
  const [stats, setStats] = useState({ finished: 0, unfinished: 0 });

  useEffect(() => {
    if (token && goalType && date) {
      fetchGoalStats(goalType, date, token).then(res => {
        if (res.success) {
          setStats({ finished: res.finished, unfinished: res.unfinished });
        }
      });
    }
  }, [goalType, date, token]);

  const data = {
    labels: ['Finished', 'Unfinished'],
    datasets: [
      {
        data: [stats.finished, stats.unfinished],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#45a049', '#e53935'],
      }
    ]
  };

  return (
    <div style={{ maxWidth: '400px', margin: '1rem auto' }}>
      <h3 style={{ textAlign: 'center' }}>
        {goalType ? goalType.toUpperCase() : ''} Goals Completion
      </h3>
      <Pie data={data} />
    </div>
  );
};

export default GoalCompletionChart;


