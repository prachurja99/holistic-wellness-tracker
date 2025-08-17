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

  const processedEntries = (Array.isArray(moodEntries) ? moodEntries : [])
    .filter(entry =>
      typeof entry.moodValue !== "undefined" &&
      entry.timestamp &&
      !isNaN(new Date(entry.timestamp)) &&
      entry.moodValue !== null
    )
    .map(entry => ({
      date: new Date(entry.timestamp).toISOString().split('T')[0],
      mood: Number(entry.moodValue)
    }))
    .reverse();

  const labels = processedEntries.map(entry => entry.date);
  const dataPoints = processedEntries.map(entry => entry.mood);

  const data = {
    labels,
    datasets: [
      {
        label: 'Mood Level',
        data: dataPoints,
        fill: false,
        borderColor: '#ff8a65',
        backgroundColor: 'rgba(255,138,101,0.15)',
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
          label: context => `Mood: ${context.parsed.y}`
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

  if (dataPoints.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#ad6842', margin: '2rem 0' }}>
        No mood data to display yet.
      </p>
    );
  }

  return <Line ref={chartRef} data={data} options={options} />;
};

export default MoodTrendsChart;





