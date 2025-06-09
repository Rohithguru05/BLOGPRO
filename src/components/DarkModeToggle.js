// src/components/DarkModeToggle.js
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import styles from './DarkModeToggle.module.css';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && 
                  window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={styles.toggleButton}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <FiSun className={styles.icon} /> : <FiMoon className={styles.icon} />}
    </button>
  );
}