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

  const handleAddComment = async (videoId, comment) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/videos/${videoId}/comments`, comment);
      setVideos(videos.map((video) => (video.id === videoId ? response.data : video)));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (videoId, commentId, newText) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/videos/${videoId}/comments/${commentId}`, { text: newText });
      setVideos(videos.map((video) => (video.id === videoId ? response.data : video)));
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (videoId, commentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/videos/${videoId}/comments/${commentId}`);
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
      const response = await axios.post(`http://localhost:5000/api/videos/${videoId}/like`, { userId: loggedInUser.id });
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
                onEdit={handleGlobalEdit} // Use handleGlobalEdit here
                onDelete={handleDelete}
                onLike={handleLike}
              />
            }
          />
          <Route
            path="/upload"
            element={<ProtectedRoute component={UploadScreen} onUpload={fetchVideos} />}
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
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} videos={videos}                onEdit={handleGlobalEdit} // Use handleGlobalEdit here
 onDelete={handleDelete} loggedInUser={JSON.parse(localStorage.getItem('loggedInUser'))} />} />
          <Route path="/update-profile" element={<ProtectedRoute component={UpdateProfile} />} />
          <Route path="/delete-profile" element={<ProtectedRoute component={DeleteProfile} />} />
          <Route path="/userVideos/:id" element={<ProtectedRoute component={UserVideos} videos={videos}/>} />
        </Routes>
      </div>
    </Router>
  );
};

const ProtectedRoute = ({ component: Component, ...props }) => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

  return loggedInUser ? <Component {...props} /> : null;
};

export default App;
