import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import { ReactComponent as YouTubeLogo } from '../../assets/youtube-logo-light.svg';

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

    if (profilePicture && profilePicture instanceof File) {
      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        updatedData.profilePicture = fileReader.result;

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
            navigate('/');
          } else {
            setMessage('Failed to update profile');
          }
        } catch (error) {
          console.error('Error updating profile:', error);
          setMessage('An error occurred. Please try again.');
        }
      };
      fileReader.readAsDataURL(profilePicture);
    } else {
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
          navigate('/');
        } else {
          setMessage('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleLogoClick = () => {
    navigate('/');
  };


  return (
    <div className="update-profile-container">
      <div className="header-logo" onClick={handleLogoClick}>
        <YouTubeLogo />
      </div>
      <h2>Update Profile</h2>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
      </div>
      <div className="form-group">
        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
      </div>
      <button onClick={handleUpdate}>Update Profile</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProfile;
