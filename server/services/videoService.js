const Video = require('../models/Video');
const mongoose = require('mongoose');

const getVideos = async () => {
  return await Video.find().sort({ views: -1 }).limit(20);
};

const createVideo = async ({ title, videoFile, thumbnail,views, duration, uploadDate, uploader }) => {
  try {
    const newVideo = new Video({
      title,
      videoFile,
      thumbnail,
      views,
      duration,
      uploadDate,
      comments: [],
      uploader
    });
    await newVideo.save();
    return newVideo;
  } catch (err) {
    return { message: err.message };
  }
};

const getUserVideos = async (userId) => {
  return await Video.find({ 'uploader.id': userId });
};

const getVideoById = async (userId, videoId) => {
  return await Video.findOne({ _id: videoId, 'uploader.id': userId });
};

const updateVideo = async (userId, videoId, updateData) => {
  return await Video.findOneAndUpdate({ _id: videoId, 'uploader.id': userId }, updateData, { new: true });
};

const deleteVideo = async (userId, videoId) => {
  if (!mongoose.Types.ObjectId.isValid(videoId) || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID or video ID');
  }
  const result = await Video.findOneAndDelete({ _id: videoId, 'uploader.id': userId });
  return result;
};

const incrementViews = async (userId, videoId) => {
  return await Video.findOneAndUpdate(
    { _id: videoId, 'uploader.id': userId },
    { $inc: { views: 1 } },
    { new: true }
  ).populate({
    path: 'comments',
    populate: {
      path: 'user', // Assuming you want to populate user details in each comment
      select: 'username profilePicture' // Select specific fields from the user
    }
  });
};


module.exports = {
  getVideos,
  createVideo,
  getUserVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  incrementViews
};
