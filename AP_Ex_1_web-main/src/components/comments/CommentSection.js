import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './CommentSection.css';
import axios from 'axios';

const CommentSection = ({ videoId, comments, onAddComment, onEditComment, onDeleteComment }) => {
  const [commentList, setCommentList] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    setCommentList(comments || []);
  }, [comments]);

  const handleAddComment = async (newCommentText) => {
    if (!loggedInUser) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/videos/${videoId}/comments`, {
        text: newCommentText,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      const newComment = response.data;
      console.log("New comment added:", newComment);
      
      // Ensure new comment has _id and user properties
      if (!newComment._id || !newComment.user) {
        throw new Error('New comment does not have _id or user');
      }

      const updatedComments = [...commentList, newComment];
      setCommentList(updatedComments);
      onAddComment(newComment, videoId);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/videos/${videoId}/comments/${commentId}`, { text: newText }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      const updatedComments = commentList.map((comment) =>
        comment._id === commentId ? { ...comment, text: newText } : comment
      );
      setCommentList(updatedComments);
      onEditComment(response.data, videoId);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/videos/${videoId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      const updatedComments = commentList.filter((comment) => comment._id !== commentId);
      setCommentList(updatedComments);
      onDeleteComment(commentId, videoId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {loggedInUser && <CommentForm onSubmit={handleAddComment} />}
      {commentList.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentSection;
