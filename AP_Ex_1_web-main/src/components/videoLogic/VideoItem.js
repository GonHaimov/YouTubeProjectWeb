import React, { useState } from 'react';
import './VideoItem.css';

const VideoItem = ({ video, onVideoSelect, onEdit, onDelete, loggedInUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(video.title);
  const [editedThumbnail, setEditedThumbnail] = useState(video.thumbnail);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onEdit({ ...video, title: editedTitle, thumbnail: editedThumbnail });
    setIsEditing(false);
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

  const handleCardClick = (e) => {
    if (!isEditing) {
      onVideoSelect(video);
    }
  };

  return (
    <div className="video-item" style={{ cursor: 'pointer' }}>
      <div className="card" onClick={handleCardClick}>
        <div className="video-image-container">
          <img src={video.thumbnail} className="card-img-top" alt={video.title} />
          <span className="video-duration">{formatDuration(video.duration)}</span>
        </div>
        <div className="card-body">
          {!isEditing ? (
            <>
              <h5 className="video-title">{video.title}</h5>
              <p className="video-info">
                {video.views} • {video.uploadDate}
              </p>
              {loggedInUser && video.uploader === loggedInUser.username && (
                <div className="video-actions">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); onDelete(video.id); }}>Delete</button>
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
                <button onClick={handleSave}>Save</button>
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
