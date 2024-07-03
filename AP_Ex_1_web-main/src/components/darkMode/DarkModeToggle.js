import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './DarkModeToggle.css'; // Import any necessary CSS

const DarkModeToggle = ({ onToggle }) => {
  const darkMode = document.body.classList.contains('dark-mode');

  return (
    <button
      className="btn dark-mode-toggle"
      onClick={onToggle}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <FaSun className="fa-sun" /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;
