import React from 'react';
import './RelatedVideoList.css';

const RelatedVideoList = ({ videos, onVideoSelect }) => {
  return (
    <div className="related-video-list">
      {videos.map((video) => (
        <div key={video._id} className="related-video-item" onClick={() => onVideoSelect(video)}>
          <img src={`http://localhost:5000${video.thumbnail}`} alt={video.title} />
          <div className="related-video-info">
            <h4>{video.title}</h4>
            <p>{video.views}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedVideoList;