import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/homeHeader/HomeHeader';
import './UploadScreen.css';

const UploadScreen = ({ onUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const handleUpload = () => {
    if (videoFile && title && thumbnail && duration) {
      const videoURL = URL.createObjectURL(videoFile);
      const thumbnailURL = URL.createObjectURL(thumbnail);

      // Log the video and thumbnail URLs to verify them
      console.log("Video URL: ", videoURL);
      console.log("Thumbnail URL: ", thumbnailURL);

      const newVideo = {
        id: Date.now().toString(),
        title,
        url: videoURL,
        thumbnail: thumbnailURL,
        views: '0 views',
        duration: parseInt(duration, 10),
        uploadDate: 'Just now',
        comments: [],
        uploader: loggedInUser.username,
      };

      onUpload(newVideo);
      navigate('/');
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
