import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import VideoPlayer from '../../components/videoLogic/VideoPlayer';
import RelatedVideoList from '../../components/relatedVideos/RelatedVideoList';
import CommentSection from '../../components/comments/CommentSection';
import HomeHeader from '../../components/homeHeader/HomeHeader';
import axios from 'axios';
import './WatchVideoPage.css';

const WatchVideoPage = ({ videos, onAddComment, onEditComment, onDeleteComment, onLike, fetchVideos }) => {
  const { id } = useParams();
  const location = useLocation();
  const { video } = location.state || {};
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(video);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await axios.patch(`http://localhost:5000/api/users/${video.uploader.id}/videos/${video._id}/views`);
        setCurrentVideo(response.data); // Update local state with incremented views
        //fetchVideos(); // Fetch updated video list
      } catch (error) {
        console.error('Error incrementing views:', error);
      }
    };

    if (video) {
      incrementViews();
    }
  }, [video, fetchVideos]);

  useEffect(() => {
    if (video) {
      setComments(video.comments || []);
    }
  }, [video]);

  const handleAddComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onAddComment(currentVideo._id, updatedComments);
  };

  const handleEditComment = (commentId, newText) => {
    const updatedComments = comments.map((comment) =>
      comment._id === commentId ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
    onEditComment(currentVideo._id, commentId, newText);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment._id !== commentId);
    setComments(updatedComments);
    onDeleteComment(currentVideo._id, commentId);
  };

  const handleVideoSelect = async (selectedVideo) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/${selectedVideo.uploader.id}/videos/${selectedVideo._id}/views`);
      //fetchVideos(); // Fetch updated video list
      navigate(`/watch/${selectedVideo._id}`, { state: { video: response.data } });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleProfileClick = (uploaderId) => {
    navigate(`/userVideos/${uploaderId}`);
  };

  if (!currentVideo) return <div>Loading...</div>;

  return (
    <div className="watch-video-page">
      <HomeHeader onSearch={() => navigate('/')} />
      <div className="main-content-container">
        <div className="video-player-container">
          <VideoPlayer video={currentVideo} onLike={() => onLike(currentVideo._id)} />
          <div className="video-details">
            <div className="video-title-section">
              <div className="uploader-info">
                <img
                  src={currentVideo.uploader.profilePicture}
                  alt={currentVideo.uploader.username}
                  className="uploader-profile-picture"
                  onClick={() => handleProfileClick(currentVideo.uploader.id)}
                />
                <span className="uploader-username" onClick={() => handleProfileClick(currentVideo.uploader.id)}>
                  {currentVideo.uploader.username}
                </span>
              </div>
              <div className="video-metadata">
                <span>{currentVideo.uploadDate}</span>
                <span>{currentVideo.views} views</span>
              </div>
            </div>
          </div>
          <CommentSection
            key={currentVideo._id}
            comments={comments}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>
        <div className="related-videos-container">
          <RelatedVideoList videos={videos} onVideoSelect={handleVideoSelect} />
        </div>
      </div>
    </div>
  );
};

export default WatchVideoPage;