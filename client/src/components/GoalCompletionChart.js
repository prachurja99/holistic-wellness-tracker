import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { fetchGoalStats } from '../api/goals';

ChartJS.register(ArcElement, Tooltip, Legend);

const getCssVariableOrFallback = (variable, fallback) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
  return value && value.trim() ? value.trim() : fallback;
};

const themeChartColors = {
  light: ['--color-chart-finished', '--color-chart-unfinished'],
  dark: ['--color-chart-finished-dark', '--color-chart-unfinished-dark'],
  sepia: ['--color-chart-finished-sepia', '--color-chart-unfinished-sepia'],
  cool: ['--color-chart-finished-cool', '--color-chart-unfinished-cool'],
  vivid: ['--color-chart-finished-vivid', '--color-chart-unfinished-vivid'],
};

const fallbackColors = {
  light: ['#4a90e2', '#7b59c1'],          // Sky Blue and Purple default
  dark: ['#7e57c2', '#d4626e'],           // Purple and muted coral
  sepia: ['#ffca28', '#fb8c00'],           // Warm yellow and orange
  cool: ['#64b5f6', '#ff6384'],             // Light blue and berry
  vivid: ['#4caf50', '#388e3c'],            // Green shades
};

const GoalCompletionChart = ({ goalType, date, token, theme = 'light' }) => {
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

  const [finishedVar, unfinishedVar] = themeChartColors[theme] || themeChartColors.light;
  const [fallbackFinished, fallbackUnfinished] = fallbackColors[theme] || fallbackColors.light;

  const finishedColor = getCssVariableOrFallback(finishedVar, fallbackFinished);
  const unfinishedColor = getCssVariableOrFallback(unfinishedVar, fallbackUnfinished);

  const data = {
    labels: ['Finished', 'Unfinished'],
    datasets: [
      {
        data: [stats.finished, stats.unfinished],
        backgroundColor: [finishedColor, unfinishedColor],
        hoverBackgroundColor: [finishedColor, unfinishedColor],
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






