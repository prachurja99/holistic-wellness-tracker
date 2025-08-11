import React, { useState } from "react";


function JournalEntry() {
  const [entry, setEntry] = useState("");

  const saveEntry = () => {
    alert("Journal saved!");
    // TODO: send to backend
    setEntry("");
  };

  return (
    <div>
      <h2>Daily Journal</h2>
      <textarea
        rows="8"
        cols="50"
        placeholder="Write your thoughts here..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <br />
      <button onClick={saveEntry}>Save</button>
    </div>
  );
}

export default JournalEntry;
