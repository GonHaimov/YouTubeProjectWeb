import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import UploadScreen from '../pages/uploadScreen/UploadScreen';
import WatchVideoPage from '../pages/watchVideoPage/WatchVideoPage';
import './App.css';
import initialVideosData from '../videos.json';
import Login from '../components/login_register/Login';
import Register from '../components/login_register/Register';
import UpdateProfile from '../components/updateProfile/UpdateProfile';
import DeleteProfile from '../components/deleteProfile/DeleteProfile';

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const storedVideos = JSON.parse(sessionStorage.getItem('uploadedVideos')) || [];
    setVideos([...initialVideosData, ...storedVideos]);
  }, []);

  const updateStoredVideos = (updatedVideos) => {
    const videosToStore = updatedVideos.filter(video => video.uploader);
    try {
      sessionStorage.setItem('uploadedVideos', JSON.stringify(videosToStore));
    } catch (e) {
      console.error('Error saving to sessionStorage', e);
    }
  };

  const handleUpload = (newVideo) => {
    const storedVideos = JSON.parse(sessionStorage.getItem('uploadedVideos')) || [];
    const updatedVideos = [newVideo, ...storedVideos];
    setVideos([...videos, ...updatedVideos]);
    updateStoredVideos(updatedVideos);
  };

  const handleEdit = (editedVideo) => {
    const storedVideos = JSON.parse(sessionStorage.getItem('uploadedVideos')) || [];
    const updatedVideos = storedVideos.map((video) =>
      video.id === editedVideo.id ? editedVideo : video
    );
    setVideos([...initialVideosData, ...updatedVideos]);
    updateStoredVideos(updatedVideos);
  };
  

  const handleDelete = (id) => {
    const storedVideos = JSON.parse(sessionStorage.getItem('uploadedVideos')) || [];
    const updatedVideos = storedVideos.filter((video) => video.id !== id);
    setVideos([...initialVideosData, ...updatedVideos]);
    updateStoredVideos(updatedVideos);
  };

  const handleSearch = (query) => {
    const results = [...initialVideosData, ...JSON.parse(sessionStorage.getItem('uploadedVideos') || '[]')].filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setVideos(results);
  };

  const handleAddComment = (videoId, updatedComments) => {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video,
          comments: updatedComments,
        };
      }
      return video;
    });
    setVideos(updatedVideos);
    updateStoredVideos(updatedVideos);
  };

  const handleEditComment = (videoId, commentId, newText) => {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video,
          comments: video.comments.map((comment) =>
            comment.id === commentId ? { ...comment, text: newText } : comment
          ),
        };
      }
      return video;
    });
    setVideos(updatedVideos);
    updateStoredVideos(updatedVideos);
  };

  const handleDeleteComment = (videoId, commentId) => {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video,
          comments: video.comments.filter((comment) => comment.id !== commentId),
        };
      }
      return video;
    });
    setVideos(updatedVideos);
    updateStoredVideos(updatedVideos);
  };

  const handleLike = (videoId) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('You must be logged in to like a video.');
      return;
    }

    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        const userLiked = video.likes && video.likes.includes(loggedInUser.username);
        return {
          ...video,
          likes: userLiked ? video.likes.filter(user => user !== loggedInUser.username) : [...(video.likes || []), loggedInUser.username]
        };
      }
      return video;
    });
    setVideos(updatedVideos);
    updateStoredVideos(updatedVideos);
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
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            }
          />
          <Route
            path="/upload"
            element={<ProtectedRoute component={UploadScreen} onUpload={handleUpload} />}
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
          <Route path="/update-profile" element={<ProtectedRoute component={UpdateProfile} />} />
          <Route path="/delete-profile" element={<ProtectedRoute component={DeleteProfile} />} />
        </Routes>
      </div>
    </Router>
  );
};

const ProtectedRoute = ({ component: Component, ...props }) => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

  return loggedInUser ? <Component {...props} /> : null;
};

export default App;
