import React, { useState } from 'react';
import './Comment.css';

const Comment = ({ comment, onEdit, onDelete }) => {
  const [likes, setLikes] = useState(comment.likes || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleSaveEdit = () => {
    onEdit(comment._id, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment._id);
  };

  if (!comment || !comment._id || !comment.user) {
    console.error('Invalid comment object:', comment);
    return null;
  }

  return (
    <div className="comment">
      <div className="comment-user-info">
        {comment.user && (
          <>
            {comment.user.profilePicture && (
              <img src={comment.user.profilePicture} alt={comment.user.username} className="comment-user-avatar" />
            )}
            <span className="comment-user-name">{comment.user.username}</span>
          </>
        )}
      </div>
      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{comment.text}</p>
      )}
      <div className="comment-actions">
        {loggedInUser && loggedInUser._id === comment.user._id && (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
