/*
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); 

  // If no user is logged in, navigate to the login page
  if (!loggedInUser) {
    navigate('/login');
    return null; // Return null to prevent rendering the rest of the component
  }

  return (
    <div>
      <h1>Welcome, {loggedInUser.username}!</h1>
      <button onClick={() => {
        localStorage.removeItem('loggedInUser'); 
        navigate('/login'); // Navigate to the login page
      }}>Logout</button>
    </div>
  );
}

export default Home
*/