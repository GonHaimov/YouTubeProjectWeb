import React, { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Comment</button>
    </form>
  );
};

export default CommentForm;
