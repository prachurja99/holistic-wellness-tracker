import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoodTracker from "./components/MoodTracker";
import HabitTracker from "./components/HabitTracker";
import JournalEntry from "./components/JournalEntry";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "1rem", fontWeight: "bold" }}>Home</Link>
        <Link to="/habit" style={{ marginRight: "1rem" }}>Habit Tracker</Link>
        <Link to="/mood" style={{ marginRight: "1rem" }}>Mood Tracker</Link>
        <Link to="/journal">Journal Entry</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2 style={{ padding: "2rem" }}>Welcome to Holistic Wellness Tracker!</h2>} />
        <Route path="/habit" element={<HabitTracker />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/journal" element={<JournalEntry />} />
      </Routes>
    </Router>
  );
}

export default App;


