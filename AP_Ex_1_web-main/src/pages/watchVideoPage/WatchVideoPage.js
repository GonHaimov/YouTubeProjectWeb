import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import VideoPlayer from '../../components/videoLogic/VideoPlayer'; // Ensure the correct path
import RelatedVideoList from '../../components/relatedVideos/RelatedVideoList'; // Ensure the correct path
import CommentSection from '../../components/comments/CommentSection'; // Ensure the correct path
import HomeHeader from '../../components/homeHeader/HomeHeader'; // Ensure the correct path
import axios from 'axios';
import './WatchVideoPage.css';

const WatchVideoPage = ({ videos, onAddComment, onEditComment, onDeleteComment, onLike }) => {
  const { id } = useParams(); // selectedVideo's id
  const location = useLocation();
  const { video } = location.state || {}; // Access the passed video object
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log('Fetching selected video:', video);
    console.log('Fetching video with id:', id);
    const fetchVideo = async () => {
      try {
        //const response = await axios.get(`http://localhost:5000/api/users/${video.uploader.id}/videos/${id}`);
        //console.log('Video fetched:', response.data);
        setComments(video.comments || []);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, []);

  const handleAddComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onAddComment(video._id, updatedComments);
  };

  const handleEditComment = (commentId, newText) => {
    const updatedComments = comments.map((comment) =>
      comment._id === commentId ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
    onEditComment(video._id, commentId, newText);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment._id !== commentId);
    setComments(updatedComments);
    onDeleteComment(video._id, commentId);
  };

  const handleVideoSelect = (video) => {
    navigate(`/watch/${video._id}`, { state: { video: video } });
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="watch-video-page">
      <HomeHeader onSearch={() => navigate('/')} />
      <div className="main-content-container">
        <div className="video-player-container">
          <VideoPlayer video={video} onLike={() => onLike(video._id)} />
          <CommentSection
            key={video._id}
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
