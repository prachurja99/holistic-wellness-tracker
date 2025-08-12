import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HabitCalendar.css';

const HabitCalendar = ({ completion = [], onDateToggle, category }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  // Helper: format to local YYYY-MM-DD
  const formatDateLocal = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Sync state when parent sends completion data
  useEffect(() => {
    const dates = completion.map((dateStr) => new Date(dateStr));
    setSelectedDates(dates);
  }, [completion]);

  const handleDateClick = (date) => {
    const dateStr = formatDateLocal(date);
    if (onDateToggle && typeof onDateToggle === 'function') {
      onDateToggle(dateStr);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = formatDateLocal(date);
      if (completion.includes(dateStr)) {
        return `completed-date ${category?.toLowerCase() || 'default'}-habit`;
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







