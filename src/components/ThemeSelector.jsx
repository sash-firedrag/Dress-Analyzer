import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette } from 'lucide-react';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', name: 'Light', color: '#f8fafc' },
    { id: 'dark', name: 'Dark', color: '#0f172a' },
    { id: 'rose', name: 'Rose', color: '#fff1f2' },
    { id: 'ocean', name: 'Ocean', color: '#f0fdfa' },
  ];

  return (
    <div className="theme-selector glass-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Palette size={20} style={{ color: 'var(--primary-color)' }} />
        <h3 style={{ margin: 0 }}>Vibe Check</h3>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: t.color,
              border: theme === t.id ? '3px solid var(--primary-color)' : '1px solid var(--glass-border)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: 'var(--shadow)',
            }}
            title={`Switch to ${t.name} theme`}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ))}
      </div>
    </div>
  );
}
