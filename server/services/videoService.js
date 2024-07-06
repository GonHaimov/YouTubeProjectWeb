const Video = require('../models/Video');

const getVideos = async () => {
  return await Video.find().sort({ views: -1 }).limit(20);
};

const createVideo = async ({ title, videoFile, thumbnail, duration, uploadDate, uploader }) => {
  try {

  const newVideo = new Video({
    title,
    videoFile,
    thumbnail,
    duration,
    uploadDate,
    comments: [], 
    uploader
  });


  await newVideo.save();

  return newVideo;
  
}
catch(err) {
  return { message: err.message };
}
}

const getUserVideos = async (userId) => {
  return await Video.find({ 'uploader.id': userId });
};

const getVideoById = async (userId, videoId) => {
  console.log("userId",userId);
  console.log("videoId",videoId);

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
