import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/homeHeader/HomeHeader'; // Ensure the correct path
import './UploadScreen.css';

const UploadScreen = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const handleUpload = async () => {
    if (videoFile && title && thumbnail && duration) {
      const formData = new FormData();
      formData.append('videoFile', videoFile);
      formData.append('title', title);
      formData.append('thumbnail', thumbnail);
      formData.append('duration', duration);
      formData.append('uploader', JSON.stringify({
        id: loggedInUser._id,
        username: loggedInUser.username,
        profilePicture: loggedInUser.profilePicture,
      }));
  
      try {
        const token = sessionStorage.getItem('token'); // Ensure token is stored in session storage
        const response = await axios.post(`http://localhost:5000/api/users/${loggedInUser._id}/videos`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` // Add the token to the headers
          },
        });
        console.log('Uploaded video:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    }
  };

  return (
    <div className="upload-screen">
      <Header showSearch={false} />
      <div className="upload-form-container">
        <form className="upload-form">
          <h2>Upload Video</h2>
          <label htmlFor="video-upload">Select Video File</label>
          <input id="video-upload" type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
          <label htmlFor="video-title">Video Title</label>
          <input id="video-title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="thumbnail-upload">Select Thumbnail Image</label>
          <input id="thumbnail-upload" type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
          <label htmlFor="video-duration">Video Duration (in seconds)</label>
          <input id="video-duration" type="number" placeholder="Duration (in seconds)" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <button type="button" onClick={handleUpload}>Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadScreen;
