import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteProfile.css';
import { ReactComponent as YouTubeLogo } from '../../assets/youtube-logo-light.svg';

const DeleteProfile = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const token = sessionStorage.getItem('authToken');

    try {
      const response = await fetch(`http://localhost:5000/api/users/${loggedInUser._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('authToken');
        alert('User deleted successfully');
        navigate('/');
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="delete-profile-container">
      <div className="header-logo" onClick={handleLogoClick}>
        <YouTubeLogo />
      </div>
      <h2>Delete Profile</h2>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default DeleteProfile;
