import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const token = sessionStorage.getItem('authToken');

    if (loggedInUser && token) {
      setUser(loggedInUser);
      fetchUserVideos(loggedInUser._id, token);
    }
  }, []);

  const fetchUserVideos = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/videos`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const videos = await response.json();
      setUserVideos(videos);
    } catch (error) {
      console.error('Error fetching user videos:', error);
    }
  };

  const handleUpdateProfile = () => {
    navigate('/update-profile');
  };

  const handleDeleteProfile = () => {
    navigate('/delete-profile');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <button onClick={handleUpdateProfile}>Update Profile</button>
        <button onClick={handleDeleteProfile}>Delete Profile</button>
      </div>
      <div className="user-videos">
        <h3>Your Videos</h3>
        <ul>
          {userVideos.map(video => (
            <li key={video._id}>
              <h4>{video.title}</h4>
              <p>{video.views} views</p>
              <p>{video.duration} seconds</p>
              <p>Uploaded on {new Date(video.uploadDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
