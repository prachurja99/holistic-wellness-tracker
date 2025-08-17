import React, { useState } from 'react';
import '../styles/JournalEntriesList.css';

const JournalEntriesList = ({ entries = [], onDelete = () => {}, onEdit = () => {} }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    tag: '',
    mood: ''
  });

  const startEditing = (entry) => {
    setEditingId(entry._id || entry.id);
    setEditData({
      title: entry.title || '',
      content: entry.content || entry.text || '',
      tag: entry.tag || '',
      mood: entry.mood || ''
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

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

  const cancelEdit = () => {
    setEditingId(null);
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  if (!entries || entries.length === 0) {
    return <p className="journal-no-entries">No journal entries yet.</p>;
  }

  return (
    <div className="journal-entries-list">
      {entries.map((entry) => (
        <div key={entry._id || entry.id} className="journal-card">
          {editingId === (entry._id || entry.id) ? (
            <>
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                className="journal-input"
              />
              <textarea
                name="content"
                value={editData.content}
                onChange={handleEditChange}
                className="journal-textarea"
              />
              <input
                type="text"
                name="tag"
                value={editData.tag}
                onChange={handleEditChange}
                placeholder="Tag (optional)"
                className="journal-input"
              />
              <input
                type="text"
                name="mood"
                value={editData.mood}
                onChange={handleEditChange}
                placeholder="Mood (optional)"
                className="journal-input"
              />
              <button onClick={submitEdit} className="btn-save">Save</button>
              <button onClick={cancelEdit} className="btn-cancel">Cancel</button>
            </>
          ) : (
            <>
              <h3 className="journal-title">{entry.title}</h3>
              <div className="journal-meta">
                <span>{formatDate(entry.date)}</span>
                {entry.tag && <span> • Tag: {entry.tag}</span>}
                {entry.mood && <span> • Mood: {entry.mood}</span>}
              </div>
              <p className="journal-content">{entry.content || entry.text}</p>
              <button onClick={() => startEditing(entry)} className="btn-edit">Edit</button>
              <button onClick={() => onDelete(entry._id || entry.id)} className="btn-delete">Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalEntriesList;






