import React, { useState, useEffect } from 'react';
import HomeHeader from '../../components/homeHeader/HomeHeader';
import Sidebar from '../../components/sideBar/Sidebar';
import ButtonBar from '../../components/ButtonsBar/ButtonBar';
import VideoList from '../../components/videoLogic/VideoList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ onSearch, onEdit, onDelete }) => {
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setAllVideos(response.data);
        setFilteredVideos(response.data); // Initialize filteredVideos with allVideos
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);
  
  const handleSearch = (query) => {
    const results = allVideos.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVideos(results);
  };

  const handleVideoSelect = (selectedVideo) => {
    navigate(`/watch/${selectedVideo._id}`, { state: { video: selectedVideo } });
  };

  return (
    <div className="container">
      <HomeHeader onSearch={handleSearch} />
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
