import React, { useState } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './CommentSection.css';

const CommentSection = ({ comments, onAddComment, onEditComment, onDeleteComment }) => {
  const [commentList, setCommentList] = useState(comments || []);
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const handleAddComment = (newCommentText) => {
    if (!loggedInUser) {
      alert("You must be logged in to comment.");
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      text: newCommentText,
      likes: 0,
      replies: [],
      user: loggedInUser,
    };
    const updatedComments = [...commentList, newComment];
    setCommentList(updatedComments);
    onAddComment(newComment);
  };

  const handleEditComment = (commentId, newText) => {
    const updatedComments = commentList.map((comment) =>
      comment.id === commentId ? { ...comment, text: newText } : comment
    );
    setCommentList(updatedComments);
    onEditComment(commentId, newText);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = commentList.filter((comment) => comment.id !== commentId);
    setCommentList(updatedComments);
    onDeleteComment(commentId);
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {loggedInUser && <CommentForm onSubmit={handleAddComment} />}
      {commentList.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentSection;
