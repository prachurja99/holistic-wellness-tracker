import React, { useState } from 'react';

const JournalEntriesList = ({ entries = [], onDelete = () => {}, onEdit = () => {} }) => {
  // Tracks which entry is currently being edited
  const [editingId, setEditingId] = useState(null);

  // Holds form data for the entry being edited
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    tag: '',
    mood: ''
  });

  // Start editing a specific entry
  const startEditing = (entry) => {
    setEditingId(entry._id || entry.id);
    setEditData({
      title: entry.title || '',
      content: entry.content || entry.text || '',
      tag: entry.tag || '',
      mood: entry.mood || ''
    });
  };

  // Handle changes in edit form inputs
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Submit the updated entry
  const submitEdit = () => {
    if (!editData.title.trim() || !editData.content.trim()) {
      alert('Title and content are required');
      return;
    }

    if (typeof onEdit === 'function') {
      onEdit(editingId, editData);
    } else {
      console.warn('onEdit is not a function');
    }
    setEditingId(null);
  };

  // Cancel edit mode
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Format date for display
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  // If there are no entries
  if (!entries || entries.length === 0) {
    return <p>No journal entries yet.</p>;
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {entries.map((entry) => (
        <div key={entry._id || entry.id} style={cardStyle}>
          {editingId === (entry._id || entry.id) ? (
            <>
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                style={inputStyle}
              />
              <textarea
                name="content"
                value={editData.content}
                onChange={handleEditChange}
                style={textareaStyle}
              />
              <input
                type="text"
                name="tag"
                value={editData.tag}
                onChange={handleEditChange}
                style={inputStyle}
                placeholder="Tag (optional)"
              />
              <input
                type="text"
                name="mood"
                value={editData.mood}
                onChange={handleEditChange}
                style={inputStyle}
                placeholder="Mood (optional)"
              />

              <button onClick={submitEdit} style={saveBtnStyle}>Save</button>
              <button onClick={cancelEdit} style={cancelBtnStyle}>Cancel</button>
            </>
          ) : (
            <>
              <h3 style={{ marginBottom: '0.25rem' }}>{entry.title}</h3>
              <div style={{ fontSize: '0.9rem', color: '#555' }}>
                <span>{formatDate(entry.date)}</span>
                {entry.tag && <span> • Tag: {entry.tag}</span>}
                {entry.mood && <span> • Mood: {entry.mood}</span>}
              </div>
              <p style={{ marginTop: '0.5rem' }}>{entry.content || entry.text}</p>

              <button onClick={() => startEditing(entry)} style={editBtnStyle}>Edit</button>
              <button onClick={() => onDelete(entry._id || entry.id)} style={deleteBtnStyle}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

// Styles
const cardStyle = {
  padding: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  marginBottom: '1rem',
  backgroundColor: '#f9f9f9'
};
const inputStyle = {
  padding: '0.5rem',
  marginBottom: '0.5rem',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc'
};
const textareaStyle = {
  padding: '0.5rem',
  marginBottom: '0.5rem',
  minHeight: '80px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc'
};
const editBtnStyle = { padding: '0.4rem 0.7rem', marginRight: '0.5rem', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const deleteBtnStyle = { padding: '0.4rem 0.7rem', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const saveBtnStyle = { padding: '0.4rem 0.7rem', marginRight: '0.5rem', background: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const cancelBtnStyle = { padding: '0.4rem 0.7rem', background: 'gray', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default JournalEntriesList;





