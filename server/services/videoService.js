// server/services/videoService.js
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

module.exports = {
  getVideos,
  createVideo,
};
