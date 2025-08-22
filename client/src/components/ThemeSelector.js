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
            padding: '6px 14px',
            borderRadius: 6,
            cursor: 'pointer',
            border: t.id === theme ? '2px solid var(--color-primary)' : '1px solid #ccc',
            backgroundColor: t.id === theme ? 'var(--color-primary)' : 'transparent',
            color: t.id === theme ? 'white' : 'var(--color-text-primary)',
            transition: 'all 0.3s ease',
            minWidth: 90,
            textAlign: 'center',
            boxShadow: t.id === theme ? '0 0 10px var(--color-primary-light)' : 'none',
          }}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
