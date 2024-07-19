const { addComment, editComment, deleteComment } = require('../services/commentService');

const addCommentController = async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;
  const userId = req.user.id; // Extract user ID from the authenticated request

  try {
    const newComment = await addComment(videoId, { text, user: userId });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editCommentController = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const updatedComment = await editComment(commentId, text);
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCommentController = async (req, res) => {
  const { videoId, commentId } = req.params;

  try {
    await deleteComment(videoId, commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addCommentController,
  editCommentController,
  deleteCommentController
};
