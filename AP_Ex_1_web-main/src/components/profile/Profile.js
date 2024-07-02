import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import VideoItem from '../../components/videoLogic/VideoItem';
import { ReactComponent as YouTubeLogo } from '../../assets/youtube-logo-light.svg';

const Profile = ({ videos, onEdit, onDelete, loggedInUser }) => {
  const [user, setUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      console.log('Profile.js - Logged in user on load:', loggedInUser);
      setUser(loggedInUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const filteredVideos = videos.filter(video => video.uploader.id === user.id);
      console.log('Profile.js - Filtered videos for user:', filteredVideos);
      setUserVideos(filteredVideos);
    }
  }, [videos, user]);

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
    navigate(`/watch/${selectedVideo.id}`);
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
              key={video.id}
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
