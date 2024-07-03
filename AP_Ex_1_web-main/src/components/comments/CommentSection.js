import React, { useState } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './CommentSection.css';
import axios from 'axios';

const CommentSection = ({ videoId, comments, onAddComment, onEditComment, onDeleteComment }) => {
  const [commentList, setCommentList] = useState(comments || []);
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const handleAddComment = async (newCommentText) => {
    if (!loggedInUser) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/videos/${videoId}/comments`, {
        text: newCommentText,
        user: loggedInUser._id,
      });
      const newComment = response.data;
      const updatedComments = [...commentList, newComment];
      setCommentList(updatedComments);
      onAddComment(newComment);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      await axios.patch(`http://localhost:5000/api/comments/${commentId}`, { text: newText });
      const updatedComments = commentList.map((comment) =>
        comment._id === commentId ? { ...comment, text: newText } : comment
      );
      setCommentList(updatedComments);
      onEditComment(commentId, newText);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      const updatedComments = commentList.filter((comment) => comment._id !== commentId);
      setCommentList(updatedComments);
      onDeleteComment(commentId);
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
