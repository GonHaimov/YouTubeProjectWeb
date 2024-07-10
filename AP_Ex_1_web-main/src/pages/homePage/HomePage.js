import React, { useState, useEffect } from 'react';
import HomeHeader from '../../components/homeHeader/HomeHeader';
import Sidebar from '../../components/sideBar/Sidebar';
import ButtonBar from '../../components/ButtonsBar/ButtonBar';
import VideoList from '../../components/videoLogic/VideoList';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ videos, onSearch, onEdit, onDelete, onLike }) => {
  const [filteredVideos, setFilteredVideos] = useState(videos);

  useEffect(() => {
    console.log("useEffect called")
    setFilteredVideos(videos);
  }, [videos]);

  console.log(videos)
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  const handleSearch = (query) => {
    const results = videos.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVideos(results);
  };

  const handleVideoSelect = (selectedVideo) => {
    navigate(`/watch/${selectedVideo._id}`, { state: { video: selectedVideo } });
  };
  console.log(filteredVideos)

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
