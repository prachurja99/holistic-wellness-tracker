import React, { useState, useEffect } from 'react';
import axios from 'axios';

const activityOptions = {
  exercise: ['Running', 'Yoga', 'Weights', 'Cycling', 'Swimming'],
  meditation: ['Mindfulness', 'Guided', 'Breathing', 'Zen', 'Body Scan']
};

function ExerciseMeditationLog({ token }) {
  const [activeTab, setActiveTab] = useState('exercise');
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [meditationLogs, setMeditationLogs] = useState([]);

  const [formData, setFormData] = useState({
    date: '',
    type: '',
    duration: '',
    notes: ''
  });

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchLogs('exercise');
    fetchLogs('meditation');
  }, []);

  function fetchLogs(type) {
    const url = type === 'exercise' ? '/api/exercises' : '/api/meditations';
    axios.get(url, { headers }).then(({ data }) => {
      if (data.success) {
        if (type === 'exercise') setExerciseLogs(data.exercises);
        else setMeditationLogs(data.meditations);
      }
    }).catch(err => {
      console.error(`Error fetching ${type} logs:`, err);
    });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => Object.assign({}, prev, { [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = activeTab === 'exercise' ? '/api/exercises' : '/api/meditations';
    axios.post(url, formData, { headers }).then(({ data }) => {
      if (data.success) {
        if (activeTab === 'exercise') setExerciseLogs(prev => [data.exercise, ...prev]);
        else setMeditationLogs(prev => [data.meditation, ...prev]);
        setFormData({ date: '', type: '', duration: '', notes: '' });
      }
    }).catch(err => {
      console.error(`Error adding ${activeTab} log:`, err);
    });
  }

  function handleDelete(id) {
    const url = activeTab === 'exercise' ? `/api/exercises/${id}` : `/api/meditations/${id}`;
    axios.delete(url, { headers }).then(({ data }) => {
      if (data.success) {
        if (activeTab === 'exercise') setExerciseLogs(prev => prev.filter(log => log._id !== id));
        else setMeditationLogs(prev => prev.filter(log => log._id !== id));
      }
    }).catch(err => {
      console.error(`Error deleting ${activeTab} log:`, err);
    });
  }

  const logs = activeTab === 'exercise' ? exerciseLogs : meditationLogs;

  return React.createElement('div', { className: 'container card' },
    React.createElement('h2', null, 'Exercise & Meditation Logs'),

    React.createElement('div', { style: { marginBottom: '1rem' } },
      React.createElement('button', {
        onClick: () => setActiveTab('exercise'),
        disabled: activeTab === 'exercise',
        style: { marginRight: '0.75rem' }
      }, 'Exercise'),
      React.createElement('button', {
        onClick: () => setActiveTab('meditation'),
        disabled: activeTab === 'meditation'
      }, 'Meditation')
    ),

    React.createElement('form', { onSubmit: handleSubmit, style: { marginBottom: '1rem' } },
      React.createElement('label', null,
        'Date:',
        React.createElement('input', {
          type: 'date', name: 'date', value: formData.date,
          onChange: handleInputChange, required: true, style: { marginLeft: '0.5rem' }
        })
      ),
      React.createElement('br'),
      React.createElement('label', null,
        'Type:',
        React.createElement('select', {
          name: 'type', value: formData.type,
          onChange: handleInputChange, required: true,
          style: { marginLeft: '0.5rem' }
        },
          React.createElement('option', { value: '' }, 'Select type'),
          ...activityOptions[activeTab].map(option =>
            React.createElement('option', { key: option, value: option }, option)
          )
        )
      ),
      React.createElement('br'),
      React.createElement('label', null,
        'Duration (minutes):',
        React.createElement('input', {
          type: 'number', name: 'duration', value: formData.duration,
          onChange: handleInputChange, min: '1', required: true,
          style: { marginLeft: '0.5rem', width: '60px' }
        })
      ),
      React.createElement('br'),
      React.createElement('label', null,
        'Notes:',
        React.createElement('textarea', {
          name: 'notes', value: formData.notes, onChange: handleInputChange,
          rows: '2', placeholder: 'Optional'
        })
      ),
      React.createElement('br'),
      React.createElement('button', { type: 'submit' },
        `Add ${activeTab === 'exercise' ? 'Exercise' : 'Meditation'} Log`
      )
    ),

    logs.length === 0 ? React.createElement('p', null, `No ${activeTab} logs yet.`) :
      React.createElement('ul', null,
        logs.map(log =>
          React.createElement('li', {
            key: log._id,
            style: {
              marginBottom: '0.7rem',
              borderBottom: '1px solid #ddd',
              paddingBottom: '0.6rem'
            }
          },
            React.createElement('strong', null, new Date(log.date).toLocaleDateString()),
            ` - ${log.type} - ${log.duration} min`,
            log.notes ? React.createElement('em', null, `: ${log.notes}`) : null,
            React.createElement('button', {
              onClick: () => handleDelete(log._id),
              style: {
                marginLeft: '1rem',
                backgroundColor: '#e74c3c',
                color: 'white',
                borderRadius: '4px',
                border: 'none',
                padding: '0 6px',
                cursor: 'pointer'
              },
              'aria-label': 'Delete log'
            }, '✕')
          )
        )
      )
  );
}

export default ExerciseMeditationLog;
