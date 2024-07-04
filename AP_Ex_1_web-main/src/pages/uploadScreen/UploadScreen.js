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
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleUpload = async () => {
    if (videoFile && title && thumbnail && duration) {
      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const uploadData = {
          videoFile, // This should be updated with the actual file path or handling strategy
          title,
          thumbnail: fileReader.result, // Store the base64 encoded thumbnail
          duration,
          uploader: {
            id: loggedInUser._id.toString(), // Ensure id is a string
            username: loggedInUser.username.toString(), // Ensure username is a string
            profilePicture: loggedInUser.profilePicture.toString() // Ensure profilePicture is a string
          }
        };

        try {
          const token = localStorage.getItem('authToken'); 
          const response = await axios.post(`http://localhost:5000/api/users/${loggedInUser._id}/videos`, uploadData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json' // Ensure the correct content type
            }
          });
          console.log('Video uploaded successfully:', response.data);
          console.log('Uploaded video details:', uploadData);
          navigate('/'); // Navigate to home page after successful upload
        } catch (error) {
          console.error('Error uploading video:', error);
        }
      };

      if (thumbnail) {
        fileReader.readAsDataURL(thumbnail);
      } else {
        console.error('Thumbnail is required.');
      }
    } else {
      console.error('All fields are required for video upload.');
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setThumbnail(file);
    } else {
      alert("Please upload a valid image file (JPEG or PNG)");
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
          <input id="thumbnail-upload" type="file" accept="image/jpeg,image/png" onChange={handleThumbnailUpload} />
          <label htmlFor="video-duration">Video Duration (in seconds)</label>
          <input id="video-duration" type="number" placeholder="Duration (in seconds)" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <button type="button" onClick={handleUpload}>Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadScreen;
