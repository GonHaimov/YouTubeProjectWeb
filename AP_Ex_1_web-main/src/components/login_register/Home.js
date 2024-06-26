import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')); // Get the logged-in user from sessionStorage

  // If no user is logged in, navigate to the login page
  if (!loggedInUser) {
    navigate('/login');
    return null; // Return null to prevent rendering the rest of the component
  }

  return (
    <div>
      {/* Display a welcome message with the username */}
      <h1>Welcome, {loggedInUser.username}!</h1>
      {/* Logout button to remove the logged-in user and navigate to the login page */}
      <button onClick={() => {
        sessionStorage.removeItem('loggedInUser'); // Remove the logged-in user from sessionStorage
        navigate('/login'); // Navigate to the login page
      }}>Logout</button>
    </div>
  );
}

export default Home;
