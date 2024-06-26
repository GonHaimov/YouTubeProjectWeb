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
  }, [video.url]);

  if (!video) {
    return <div>Loading...</div>;
  }

  const { url, title, uploader } = video;
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const handleLikeClick = () => {
    onLike(video.id);
  };

  return (
    <div className='video'>
      <video ref={videoRef} width="1038" height="534" controls key={video.id}>
        <source src={url} type="video/mp4" />
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
