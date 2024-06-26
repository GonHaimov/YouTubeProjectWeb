import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import youtubeLogo from '../../assets/youtube-logo.png';
import './LoginApp.css'; // Make sure to update CSS for new layout

function Login() {
  const [username, setUsername] = useState(''); // State to store the username input
  const [password, setPassword] = useState(''); // State to store the password input
  const [loginError, setLoginError] = useState(''); // State to store login error messages
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsers = JSON.parse(sessionStorage.getItem('users')) || []; // Get stored users from sessionStorage
    const user = storedUsers.find(user => user.username === username && user.password === password); // Find the user with matching username and password

    if (user) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user)); // Store the logged-in user in sessionStorage
      alert('Login successful!');
      navigate('/'); // Navigate to the home page
    } else {
      setLoginError('Username or password is incorrect'); // Set login error message
    }
  };

  const handleGuestLogin = () => {
    navigate('/'); // Navigate to the home page as a guest
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src={youtubeLogo} alt="YouTube Logo" className="logo" /> {/* YouTube logo */}
      </div>
      <div className="right-section">
        <div className="form-container">
          <h1>Sign In</h1>
          <form>
            <label className="input-label">
              <div className="input-wrapper">
                <i className="fa fa-user icon"></i> {/* User icon */}
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update username state
                />
              </div>
            </label>
            <label className="input-label">
              <div className="input-wrapper">
                <i className="fa fa-lock icon"></i> {/* Password icon */}
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
              </div>
            </label>
            {loginError && <p className="error-message">{loginError}</p>} {/* Display login error */}
            <button type="button" className="login-btn" onClick={handleLogin}>SIGN IN</button> {/* Sign in button */}
            <button type="button" className="guest-btn" onClick={handleGuestLogin}>Enter as a Guest</button> {/* Guest login button */}
          </form>
          <p>Don't have an account? <span onClick={handleRegisterClick} className="register-link">Sign Up Now</span></p> {/* Link to registration page */}
        </div>
      </div>
    </div>
  );
}

export default Login;
