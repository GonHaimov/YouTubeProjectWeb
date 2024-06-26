import React, { useState } from 'react';
import './ReplyForm.css';

const ReplyForm = ({ onSubmit }) => {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onSubmit(replyText);
      setReplyText('');
    }
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <button type="submit">Reply</button>
    </form>
  );
};

export default ReplyForm;
