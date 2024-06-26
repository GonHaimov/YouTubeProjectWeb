// server/controllers/videoController.js
const { getVideos, createVideo } = require('../services/videoService');

const getVideosController = async (req, res) => {
  try {
    const videos = await getVideos();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVideoController = async (req, res) => {
  const { title, url, thumbnail, views, duration, uploadDate, comments, uploader } = req.body;

  try {
    const savedVideo = await createVideo({ title, url, thumbnail, views, duration, uploadDate, comments, uploader });
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getVideosController,
  createVideoController,
};
