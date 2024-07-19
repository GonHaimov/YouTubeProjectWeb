const Comment = require('../models/Comments');
const Video = require('../models/Video');

const addComment = async (videoId, commentData) => {
  const { text, user } = commentData;

  const newComment = new Comment({
    text,
    user,
    video: videoId
  });

  await newComment.save();
  await Video.findByIdAndUpdate(videoId, { $push: { comments: newComment._id } });

  return newComment.populate('user', '_id username profilePicture');
};

const editComment = async (commentId, text) => {
  return await Comment.findByIdAndUpdate(commentId, { text }, { new: true }).populate('user', 'username profilePicture');
};

const deleteComment = async (videoId, commentId) => {
  await Comment.findByIdAndDelete(commentId);
  await Video.findByIdAndUpdate(videoId, { $pull: { comments: commentId } });
};

module.exports = {
  addComment,
  editComment,
  deleteComment
};
