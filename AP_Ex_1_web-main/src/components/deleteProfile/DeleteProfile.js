import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        navigate('/register');
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="delete-profile">
      <h2>Delete Profile</h2>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default DeleteProfile;
