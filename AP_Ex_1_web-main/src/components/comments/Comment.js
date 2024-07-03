import React, { useState } from 'react';
import ReplyForm from './ReplyForm';
import './Comment.css';
import axios from 'axios';

const Comment = ({ comment, onEdit, onDelete }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  const handleReply = (replyText) => {
    if (!loggedInUser) {
      alert("You must be logged in to reply to a comment.");
      return;
    }

    const newReply = {
      id: Date.now().toString(),
      text: replyText,
      likes: 0,
      replies: [],
      user: loggedInUser,
    };
    setReplies([...replies, newReply]);
    setIsReplying(false);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/comments/${comment._id}`, { text: editedText });
      onEdit(comment._id, editedText);
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${comment._id}`);
      onDelete(comment._id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

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
        <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
        <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
        {loggedInUser && (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
      {isReplying && <ReplyForm onSubmit={handleReply} />}
      <div className="replies">
        {replies.map((reply) => (
          <Comment key={reply._id} comment={reply} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
