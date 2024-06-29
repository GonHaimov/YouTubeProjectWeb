import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserVideos.css';

const UserVideos = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-videos-container">
      <div className="user-info">
        <img src={user.profilePicture} alt={user.username} className="user-profile-picture" />
        <h2>{user.username}</h2>
      </div>
      <div className="user-videos">
        <h3>{user.username}'s Videos</h3>
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

export default UserVideos;
