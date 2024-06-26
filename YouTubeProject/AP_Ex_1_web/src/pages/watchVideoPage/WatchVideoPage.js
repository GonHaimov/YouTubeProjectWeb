import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../../components/videoLogic/VideoPlayer';
import RelatedVideoList from '../../components/relatedVideos/RelatedVideoList';
import CommentSection from '../../components/comments/CommentSection';
import HomeHeader from '../../components/homeHeader/HomeHeader';
import './WatchVideoPage.css';

const WatchVideoPage = ({ videos, onAddComment, onEditComment, onDeleteComment, onLike }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const video = videos.find((video) => video.id === id);
    setSelectedVideo(video);

    if (video) {
      setComments(video.comments || []);
    } else {
      setComments([]);
    }
  }, [id, videos]);

  const handleAddComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onAddComment(selectedVideo.id, updatedComments);
  };

  const handleEditComment = (commentId, newText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
    onEditComment(selectedVideo.id, commentId, newText);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
    onDeleteComment(selectedVideo.id, commentId);
  };

  const handleVideoSelect = (video) => {
    navigate(`/watch/${video.id}`);
  };

  if (!selectedVideo) return <div>Loading...</div>;

  return (
    <div className="watch-video-page">
      <HomeHeader onSearch={() => navigate('/')} />
      <div className="main-content-container">
        <div className="video-player-container">
          <VideoPlayer video={selectedVideo} onLike={() => onLike(selectedVideo.id)} />
          <CommentSection
            key={selectedVideo.id}
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
