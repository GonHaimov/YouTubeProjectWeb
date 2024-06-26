import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaMicrophone, FaBell, FaPlus, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { ReactComponent as YouTubeLogoLight } from '../../assets/youtube-logo-light.svg';
import YouTubeLogoDark from '../../assets/youtube-logo-dark.jpeg';

import DarkModeToggle from '../darkMode/DarkModeToggle';

const HomeHeader = ({ onSearch, showSearch = true }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [userImage, setUserImage] = useState(null); // State to store user image URL
  const [username, setUsername] = useState(''); // State to store username
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (user) {
      setIsLoggedIn(true);
      setUserImage(user.profilePicture);
      setUsername(user.username); // Set username from the stored user data
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!showSearch) return;
    if (query.trim()) {
      onSearch(query);
      const newRecentSearches = [query, ...recentSearches.filter((search) => search !== query)].slice(0, 10);
      setRecentSearches(newRecentSearches);
      sessionStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      setQuery('');
    }
    setShowDropdown(false);
  };

  const handleFocus = () => {
    if (!showSearch) return;
    setShowDropdown(true);
  };

  const handleBlur = (event) => {
    if (!showSearch) return;
    if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
      setShowDropdown(false);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    if (showSearch) onSearch('');
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserImage(null);
    sessionStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleUploadClick = () => {
    if (isLoggedIn) {
      navigate('/upload');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="header-container">
      <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        {isDarkMode ? (
          <img src={YouTubeLogoDark} alt="YouTube Logo Dark" className="youtube-logo-dark" />
        ) : (
          <YouTubeLogoLight className="youtube-logo-light" />
        )}
      </div>
      {showSearch && (
        <form className="form-inline search-form" onSubmit={handleSearch}>
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={!showSearch}
          />
          <button className="btn search-button" type="submit" disabled={!showSearch}>
            <FaSearch />
          </button>
          <button className="btn mic-button" type="button" disabled={!showSearch}>
            <FaMicrophone />
          </button>
          {showDropdown && (
            <div className="recent-searches-dropdown" ref={dropdownRef}>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onMouseDown={() => {
                    setQuery(search);
                    onSearch(search);
                    setShowDropdown(false);
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          )}
        </form>
      )}
      <div className="right-icons">
        <button className="btn upload-button" type="button" onClick={handleUploadClick}>
          <FaPlus />
        </button>
        <DarkModeToggle onToggle={handleToggleDarkMode} />
        <button className="btn notification-button" type="button">
          <FaBell />
        </button>
        {!isLoggedIn && <FaUserCircle className="account-icon" />}
        {isLoggedIn ? (
          <>
            <img src={userImage} alt="User" className="user-image" />
            <span className="username">{username}</span> {/* Display the username */}
            <button className="btn btn-outline-primary sign-in-button" type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="btn btn-outline-primary sign-in-button" type="button" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
