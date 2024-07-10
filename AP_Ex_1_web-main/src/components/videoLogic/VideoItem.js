import React, { useState } from 'react';
import './VideoItem.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VideoItem = ({ video, onVideoSelect, onEdit, onDelete, loggedInUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(video.title);
  const [editedThumbnail, setEditedThumbnail] = useState(video.thumbnail);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    if (isEditing) {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          console.error('Auth token not found in localStorage');
          return;
        }

        const response = await axios.patch(
          `http://localhost:5000/api/users/${video.uploader.id}/videos/${video._id}`,
          {
            title: editedTitle,
            thumbnail: editedThumbnail,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          }
        );

        onEdit(response.data);
      } catch (error) {
        console.error('Error updating video:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('Auth token not found in localStorage');
        return;
      }

      await axios.delete(`http://localhost:5000/api/users/${video.uploader.id}/videos/${video._id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });

      onDelete(video._id);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailClick = () => {
    if (onVideoSelect) {
      onVideoSelect(video);
    }
  };

  return (
    <div className="video-item">
      <div className="card">
        <div className="video-image-container" onClick={handleThumbnailClick}>
          <img src={video.thumbnail.startsWith('/uploads/') ? `http://localhost:5000${video.thumbnail}` : video.thumbnail} className="card-img-top" alt={video.title} />
          <span className="video-duration">{formatDuration(video.duration)}</span>
        </div>
        <div className="card-body">
          {!isEditing ? (
            <>
              <h5 className="video-title">{video.title}</h5>
              <p className="video-info">
                {video.views} • {video.uploadDate}
              </p>
              <div className="uploader-info">
                <Link to={`/userVideos/${video.uploader.id}`}>
                  <img src={video.uploader.profilePicture} alt={video.uploader.username} className="uploader-profile-picture" />
                </Link>
                <span>{video.uploader.username}</span>
              </div>
              {loggedInUser && video.uploader.username === loggedInUser.username && (
                <div className="video-actions">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Edit title"
              />
              <input type="file" accept="image/*" onChange={handleThumbnailChange} />
              {editedThumbnail && <img src={editedThumbnail} alt="Edited Thumbnail" className="edited-thumbnail" />}
              <div className="video-actions">
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
