import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ video, onLike }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error('Error attempting to play:', error);
      });
    }
  }, [video?.videoFile]);

  if (!video) {
    return <div>Loading...</div>;
  }

  const { videoFile, title, uploader } = video;
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLikeClick = () => {
    onLike(video._id);
  };

  // Construct the video URL only if it exists
  const videoUrl = videoFile?.startsWith('/uploads/') ? `http://localhost:5000${videoFile}` : videoFile;

  return (
    <div className='video'>
      <video ref={videoRef} width="1038" height="534" controls key={video._id}>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className='video-accessories'>
        <div className="video-title">
          <h1>{title}</h1>
        </div>
        <div className='video-buttons'>
          <button className='video-like-button' onClick={handleLikeClick}>
            👍 {video.likes ? video.likes.length : 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
