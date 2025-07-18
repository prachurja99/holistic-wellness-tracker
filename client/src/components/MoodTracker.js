import React, { useState } from "react";

function MoodTracker() {
  const [mood, setMood] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your mood today: ${mood}`);
    // TODO: Send to backend
  };

  return (
    <div>
      <h2>Mood Tracker</h2>
      <form onSubmit={handleSubmit}>
        <label>Select your mood:</label><br />
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">--Choose--</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Anxious">Anxious</option>
          <option value="Calm">Calm</option>
        </select><br /><br />
        <button type="submit">Save Mood</button>
      </form>
    </div>
  );
}

export default MoodTracker;
