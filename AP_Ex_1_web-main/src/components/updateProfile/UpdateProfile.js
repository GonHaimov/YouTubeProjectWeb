import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUsername(loggedInUser.username);
      setEmail(loggedInUser.email);
      setProfilePicture(loggedInUser.profilePicture);
    }
  }, []);

  const handleUpdate = async () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const token = sessionStorage.getItem('authToken');

    const updatedData = {
      username,
      email,
      profilePicture,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/users/${loggedInUser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="update-profile">
      <h2>Update Profile</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfilePicture(e.target.files[0])}
      />
      <button onClick={handleUpdate}>Update Profile</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProfile;
