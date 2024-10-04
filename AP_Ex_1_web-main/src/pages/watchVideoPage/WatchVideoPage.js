import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoPlayer from '../../components/videoLogic/VideoPlayer';
import RelatedVideoList from '../../components/relatedVideos/RelatedVideoList';
import CommentSection from '../../components/comments/CommentSection';
import HomeHeader from '../../components/homeHeader/HomeHeader';
import axios from 'axios';
import './WatchVideoPage.css';

const WatchVideoPage = ({ onAddComment, onEditComment, onDeleteComment, onLike }) => {
  const location = useLocation();
  const { video } = location.state || {};
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(video);
  const [recommendedVideos, setRecommendedVideos] = useState([]); // State for recommended videos

  // Increment views when the video is played
  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/users/${video.uploader.id}/videos/${video._id}/views`
        );
        setCurrentVideo(response.data); // Update local state with incremented views
        setComments(response.data.comments || []);
      } catch (error) {
        console.error('Error incrementing views:', error);
      }
    };

    if (video) {
      incrementViews();
    }
  }, [video]);

  // Fetch recommended videos based on the user's watch history
  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Fetch the logged-in user
      console.log("hi",loggedInUser)
      if (!loggedInUser || !loggedInUser._id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/${0}/videos/recommended/${video._id}`
          );
          console.log('Recommended videos from API:', response.data); // Log recommended videos
          setRecommendedVideos(response.data);
        } catch (error) {
          console.error('Error fetching recommended videos:', error);
        }
        console.error('User not logged in or no user ID found');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${loggedInUser._id}/videos/recommended/${video._id}`
        );
        console.log('Recommended videos from API:', response.data); // Log recommended videos
        setRecommendedVideos(response.data);
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      }
    };

    if (currentVideo) {
      fetchRecommendedVideos();
    }
  }, [currentVideo]);

  // Handle adding a new comment
  const handleAddComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onAddComment(currentVideo._id, updatedComments);
  };

  // Handle editing a comment
  const handleEditComment = (commentId, newText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, text: newText } : comment
      )
    );
  };

  // Handle deleting a comment
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment._id !== commentId);
    setComments(updatedComments);
    onDeleteComment(currentVideo._id, commentId);
  };

  // Handle selecting a new video to watch
  const handleVideoSelect = async (selectedVideo) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/users/${selectedVideo.uploader.id}/videos/${selectedVideo._id}/views`
      );
      navigate(`/watch/${selectedVideo._id}`, { state: { video: response.data } });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  // Handle profile click to view uploader's videos
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
                <span
                  className="uploader-username"
                  onClick={() => handleProfileClick(currentVideo.uploader.id)}
                >
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
            videoId={currentVideo._id}
            comments={comments}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>
        <div className="related-videos-container">
          <RelatedVideoList videos={recommendedVideos} onVideoSelect={handleVideoSelect} />
        </div>
      </div>
    </div>
  );
};

export default WatchVideoPage;
