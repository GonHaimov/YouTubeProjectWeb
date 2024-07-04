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
  const { title, videoFile, thumbnail, duration, uploader } = req.body;
  // Check if all required fields are present
 // Check if all required fields are present
 if (!videoFile || !title || !thumbnail || !duration || !uploader || !uploader.id || !uploader.username || !uploader.profilePicture) {
  if (!videoFile) console.log('videoFile is undefined');
  if (!title) console.log('title is undefined');
  if (!thumbnail) console.log('thumbnail is undefined');
  if (!duration) console.log('duration is undefined');
  if (!uploader) console.log('uploader is undefined');
  if (!uploader.id) console.log('uploader.id is undefined');
  if (!uploader.username) console.log('uploader.username is undefined');
  if (!uploader.profilePicture) console.log('uploader.profilePicture is undefined');
  return res.status(400).json({ message: 'All required fields must be provided.' });
}
const uploadDate = new Date(); 
  try {
    const savedVideo = await createVideo({
      videoFile,
      title,
      thumbnail,
      duration,
      uploadDate,
      comments: [],
      uploader
    });
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
