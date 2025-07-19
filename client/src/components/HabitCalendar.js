// src/components/HabitCalendar.js
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HabitCalendar.css'; // CSS for .completed-date

const HabitCalendar = ({ completion = [], onDateToggle }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  // Sync local selectedDates when completion prop changes
  useEffect(() => {
    const dates = completion.map((dateStr) => new Date(dateStr));
    setSelectedDates(dates);
  }, [completion]);

  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split('T')[0];

    // Call parent function safely
    if (onDateToggle && typeof onDateToggle === 'function') {
      onDateToggle(dateStr);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (completion.includes(dateStr)) {
        return 'completed-date';
      }
    }
    return null;
  };

  return (
    <div>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default HabitCalendar;






