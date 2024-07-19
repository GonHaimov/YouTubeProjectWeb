import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from '../pages/homePage/HomePage';
import UploadScreen from '../pages/uploadScreen/UploadScreen';
import WatchVideoPage from '../pages/watchVideoPage/WatchVideoPage';
import './App.css';
import Login from '../components/login_register/Login';
import Register from '../components/login_register/Register';
import UpdateProfile from '../components/updateProfile/UpdateProfile';
import DeleteProfile from '../components/deleteProfile/DeleteProfile';
import Profile from '../components/profile/Profile';
import UserVideos from '../components/profile/UserVideos';

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    try {
      const response = await axios.get('http://localhost:5000/api/videos');
      console.log(response);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  const handleGlobalEdit = async (editedVideo) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('Auth token not found in localStorage');
        return;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/users/${editedVideo.uploader.id}/videos/${editedVideo._id}`, 
        editedVideo, 
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      );

      setVideos(videos.map((video) => (video._id === editedVideo._id ? response.data : video)));
    } catch (error) {
      console.error('Error editing video:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const video = videos.find(v => v.id === id);

      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos', { params: { q: query } });
      setVideos(response.data);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  //handle add views

  const handleAddComment = async (response, videoId) => {
    try {
      setVideos(videos.map((video) => (video.id === videoId ? response.data : video)));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (response,videoId) => {
    try {
      setVideos(videos.map((video) => (video.id === videoId ? response.data : video)));
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (response, videoId) => {
    try {
      setVideos(videos.map((video) => (video.id === videoId ? response.data : video)));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLike = async (videoId) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('You must be logged in to like a video.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/videos/${videoId}/like, { userId: loggedInUser.id }`);
      setVideos(videos.map((video) => (video.id === videoId ? response.data : video)));
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                videos={videos}
                onSearch={handleSearch}
                onEdit={handleGlobalEdit}
                onDelete={handleDelete}
                onLike={handleLike}
                fetchVideos={fetchVideos} // Pass fetchVideos function to HomePage
              />
            }
          />
          <Route
            path="/upload"
            element={<ProtectedRoute component={UploadScreen} onUpload={fetchVideos} isProtected={true} />}
          />
          <Route
            path="/watch/:id"
            element={
              <WatchVideoPage
                videos={videos}
                onAddComment={handleAddComment}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment}
                onLike={handleLike}
                //fetchVideos={fetchVideos} // Pass fetchVideos function to WatchVideoPage
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} videos={videos} onEdit={handleGlobalEdit} onDelete={handleDelete} loggedInUser={JSON.parse(localStorage.getItem('loggedInUser'))} isProtected={true} />} />
          <Route path="/update-profile" element={<ProtectedRoute component={UpdateProfile} isProtected={true} />} />
          <Route path="/delete-profile" element={<ProtectedRoute component={DeleteProfile} isProtected={true} />} />
          <Route path="/userVideos/:id" element={<ProtectedRoute component={UserVideos} videos={videos} isProtected={false} />} />
        </Routes>
      </div>
    </Router>
  );
};

const ProtectedRoute = ({ component: Component, isProtected, ...props }) => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (isProtected && !loggedInUser) {
      navigate('/login');
    }
  }, [isProtected, loggedInUser, navigate]);

  return !isProtected || loggedInUser ? <Component {...props} /> : null;
};


export default App;