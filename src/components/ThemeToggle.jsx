import React from 'react';
import useLocalStorage from '../useLocalStorage';

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme_v1', 'light');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="theme-toggle">
      <span className="theme-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
      <button
        className={`toggle-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      >
        <span className="slider"></span>
      </button>
    </div>
  );
}
