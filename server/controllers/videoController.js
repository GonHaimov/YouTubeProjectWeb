const { getVideos, createVideo, getUserVideos, getVideoById, updateVideo, deleteVideo } = require('../services/videoService');

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

const getUserVideosController = async (req, res) => {
  const { id } = req.params;

  try {
    const videos = await getUserVideos(id);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVideoByIdController = async (req, res) => {
  const { id, pid } = req.params;

  try {
    const video = await getVideoById(id, pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateVideoController = async (req, res) => {
  const { id, pid } = req.params;
  const updateData = req.body;

  try {
    const updatedVideo = await updateVideo(id, pid, updateData);
    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVideoController = async (req, res) => {
  const { id, pid } = req.params;

  try {
    const deletedVideo = await deleteVideo(id, pid);
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getVideosController,
  createVideoController,
  getUserVideosController,
  getVideoByIdController,
  updateVideoController,
  deleteVideoController,
};
