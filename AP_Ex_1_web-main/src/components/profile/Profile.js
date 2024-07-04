import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import VideoItem from '../../components/videoLogic/VideoItem';
import { ReactComponent as YouTubeLogo } from '../../assets/youtube-logo-light.svg';

const Profile = ({ onEdit, onDelete, loggedInUser }) => {
  const [user, setUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserVideos = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${user._id}/videos`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log('Profile.js - Fetched user videos:', response.data);
          setUserVideos(response.data);
        } catch (error) {
          console.error('Error fetching user videos:', error);
        }
      };

      fetchUserVideos();
    }
  }, [user]);

  const handleUpdateProfile = () => {
    navigate('/update-profile');
  };

  const handleDeleteProfile = () => {
    navigate('/delete-profile');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleVideoSelect = (selectedVideo) => {
    navigate(`/watch/${selectedVideo._id}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="header-logo" onClick={handleLogoClick}>
        <YouTubeLogo />
      </div>
      <div className="profile-info">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <button onClick={handleUpdateProfile}>Update Profile</button>
        <button onClick={handleDeleteProfile}>Delete Profile</button>
      </div>

      <div className="user-videos">
        <h3>Uploaded Videos</h3>
        <div className="video-list">
          {userVideos.map((video) => (
            <VideoItem
              key={video._id}
              video={video}
              onVideoSelect={handleVideoSelect}
              onEdit={onEdit}
              onDelete={onDelete}
              loggedInUser={loggedInUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
