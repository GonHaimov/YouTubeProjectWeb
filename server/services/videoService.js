const Video = require('../models/Video');

const getVideos = async () => {
  return await Video.find().sort({ views: -1 }).limit(20);
};

const createVideo = async ({ title, url, thumbnail, views, duration, uploadDate, comments, uploader }) => {
  const newVideo = new Video({
    title,
    url,
    thumbnail,
    views,
    duration,
    uploadDate,
    comments,
    uploader,
  });

  return await newVideo.save();
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
  return await Video.findOneAndDelete({ _id: videoId, 'uploader.id': userId });
};

module.exports = {
  getVideos,
  createVideo,
  getUserVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
};
