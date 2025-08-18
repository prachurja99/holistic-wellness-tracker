import React from 'react';

const themes = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'cool', label: 'Cool Blue' },
  { id: 'vivid', label: 'Vivid' },
];

export default function ThemeSelector({ theme, setTheme }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: 8 }}>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          style={{
            fontWeight: t.id === theme ? 'bold' : 'normal',
            padding: '6px 12px',
            borderRadius: 4,
            cursor: 'pointer',
            border: t.id === theme ? '2px solid var(--primary)' : '1px solid #ccc',
            backgroundColor: t.id === theme ? 'var(--primary)' : 'transparent',
            color: t.id === theme ? 'white' : 'var(--text)',
            transition: 'all 0.2s ease',
          }}
          aria-label={`Switch to ${t.label} theme`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
