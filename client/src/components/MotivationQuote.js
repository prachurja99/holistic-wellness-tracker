import React, { useState, useEffect } from 'react';

const quotes = [
  "The secret of getting ahead is getting started.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Wellness is a connection of paths: knowledge and action.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Push yourself, because no one else is going to do it for you.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "Every day is a chance to get better.",
  "Small progress is still progress.",
  "Dream big and dare to fail.",
  "What we think, we become.",
  "Life is what happens to you while you're busy making other plans.",
  "The way to get started is to quit talking and begin doing.",
  "Don't let yesterday take up too much of today."
];

const MotivationQuote = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`motivation-quote-container ${isVisible ? 'visible' : 'hidden'}`}
    >
      <div className="motivation-quote-text">
        "{quotes[currentIndex]}"
      </div>

      <div className="motivation-quote-dots">
        {quotes.slice(0, 5).map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex % 5 === index ? 'active' : ''}`}
          />
        ))}
      </div>

      <div className="slide-progress-bar" />
    </div>
  );
};

export default MotivationQuote;




