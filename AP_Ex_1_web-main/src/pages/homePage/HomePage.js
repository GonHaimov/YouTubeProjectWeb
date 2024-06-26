import React, { useState, useEffect } from 'react';
import HomeHeader from '../../components/homeHeader/HomeHeader';
import Sidebar from '../../components/sideBar/Sidebar';
import ButtonBar from '../../components/ButtonsBar/ButtonBar';
import VideoList from '../../components/videoLogic/VideoList';
import initialVideosData from '../../videos.json';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ videos, onSearch, onEdit, onDelete }) => {
  const [filteredVideos, setFilteredVideos] = useState([]);
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const navigate = useNavigate();
  useEffect(() => {
    setFilteredVideos(videos.length ? videos : initialVideosData);
  }, [videos]);

  const handleVideoSelect = (selectedVideo) => {
    navigate(`/watch/${selectedVideo.id}`);
  };

  return (
    <div className="container">
      <HomeHeader onSearch={onSearch} />
      <div className="main-content-container">
        <Sidebar />
        <div className="content-container">
          <ButtonBar />
          <VideoList
            videos={filteredVideos}
            onVideoSelect={handleVideoSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            loggedInUser={loggedInUser}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
