// src/components/MoodTrendsChart.js
import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const MoodTrendsChart = ({ moodEntries }) => {
  const chartRef = useRef();

  // DEBUG: See the raw mood entries
  console.log('Mood Entries:', moodEntries);

  // Process and sanitize entries
  const processedEntries = moodEntries
    .filter((entry) => {
      const date = new Date(entry.timestamp);
      return entry.timestamp && !isNaN(date);
    })
    .map((entry) => ({
      date: new Date(entry.timestamp).toISOString().split('T')[0], // YYYY-MM-DD
      mood: parseInt(entry.moodValue) || 0
    }))
    .reverse(); // Optional: to show oldest to newest

  const labels = processedEntries.map((entry) => entry.date);
  const dataPoints = processedEntries.map((entry) => entry.mood);

  const data = {
    labels,
    datasets: [
      {
        label: 'Mood Level',
        data: dataPoints,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Mood Trends Over Time',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: (context) => `Mood: ${context.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 10,
        title: { display: true, text: 'Mood Level' }
      },
      x: {
        title: { display: true, text: 'Date' },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.update();
    }
  }, [labels, dataPoints]);

  return <Line ref={chartRef} data={data} options={options} />;
};

export default MoodTrendsChart;



