import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserVideos.css';
import VideoItem from '../../components/videoLogic/VideoItem';
import { ReactComponent as YouTubeLogo } from '../../assets/youtube-logo-light.svg';

const UserVideos = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData(id);
    fetchUserVideos(id);
  }, [id]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserVideos = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/videos`);
      const data = await response.json();
      setUserVideos(data);
    } catch (error) {
      console.error('Error fetching user videos:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleVideoSelect = (selectedVideo) => {
    navigate(`/watch/${selectedVideo._id}`, { state: { video: selectedVideo } });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-videos-container">
      <div className="header-logo" onClick={handleLogoClick}>
        <YouTubeLogo />
      </div>
      <div className="profile-info">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>
      <div className="user-videos">
        <h3>Uploaded Videos</h3>
        <div className="video-list">
          {userVideos.map((video) => (
            <VideoItem
              key={video._id}
              video={video}
              onVideoSelect={handleVideoSelect}
              loggedInUser={null} // No need for loggedInUser in this context
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserVideos;
