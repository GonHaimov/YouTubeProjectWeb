const { getVideos, createVideo, getUserVideos, getVideoById, updateVideo, deleteVideo } = require('../services/videoService');
const upload = require('../utils/multerConfig.js')
const Video = require('../models/Video.js')

const getVideosController = async (req, res) => {
  try {
    const videos = await getVideos();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVideoController = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err);
    }

    const { title, duration, uploader } = req.body;
    const videoFile = req.files['videoFile'][0];
    const thumbnail = req.files['thumbnail'][0];

    let parsedUploader;
    try {
      parsedUploader = JSON.parse(uploader);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid uploader JSON.' });
    }

    const uploadDate = new Date();

    try {
      const newVideo = new Video({
        title,
        videoFile: videoFile.path,
        thumbnail: thumbnail.path,
        duration,
        uploadDate,
        comments: [],
        uploader: parsedUploader // make sure to use parsedUploader
      });

      await newVideo.save();
      res.status(201).json(newVideo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

module.exports = createVideoController;


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
