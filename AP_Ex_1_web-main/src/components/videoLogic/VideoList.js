import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos, onVideoSelect, onEdit, onDelete, loggedInUser }) => {
  const renderedVideos = videos.map((video) => {
    return <VideoItem
      key={video._id}
      video={video}
      onVideoSelect={() => onVideoSelect(video)}
      onEdit={onEdit}
      onDelete={onDelete}
      loggedInUser={loggedInUser}
    />;
  });

  return <div className="row">{renderedVideos}</div>;
};

export default VideoList;
