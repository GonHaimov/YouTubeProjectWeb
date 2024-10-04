const {
  getVideos,
  createVideo,
  getUserVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  incrementViews
} = require('../services/videoService');

const { getRecommendedVideos } = require('../services/videoService');
const upload = require('../utils/multerConfig.js');
const Video = require('../models/Video');
const User = require('../models/User'); // Make sure User is imported
const mongoose = require('mongoose'); // Import mongoose to work with ObjectId
const net = require('net');

// Controller to get all videos
const getVideosController = async (req, res) => {
  try {
    const videos = await getVideos();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to handle video creation
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

    const uploadDate = new Date().toLocaleDateString();

    try {
      const newVideo = new Video({
        title,
        videoFile: `/uploads/videos/${videoFile.filename}`,
        thumbnail: `/uploads/thumbnails/${thumbnail.filename}`,
        views: 0,
        duration,
        uploadDate,
        comments: [],
        uploader: parsedUploader
      });

      await newVideo.save();
      res.status(201).json(newVideo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// Controller to get videos for a specific user
const getUserVideosController = async (req, res) => { 
  const { id } = req.params;

  try {
    const videos = await getUserVideos(id);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to get video by ID
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

// Controller to update a video
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

// Controller to delete a video
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

// TCP test function to send data to the C++ server
const tcpTest = async (videoID, userId) => {
  const HOST = '192.168.245.128'; // Server IP address
  const PORTTCP = 5555;           // Server port

  // Create a TCP client
  const client = new net.Socket();

  // Connect to the server
  client.connect(PORTTCP, HOST, () => {
    console.log(`Connected to server at ${HOST}:${PORTTCP}`);
    client.write(`recommend ${userId} ${videoID}`);
  });

  // Listen for data from the server
  client.on('data', (data) => {
    console.log(`Received from server: ${data}`);
    client.end(); // Close the connection after receiving the response
  });

  client.on('close', () => {
    console.log('Connection closed');
  });

  client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
};

// Controller to increment video views and update watch history
const incrementVideoViews = async (req, res) => {
  const { id, pid } = req.params; // id is user ID, pid is video ID

  try {
    const video = await incrementViews(id, pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Add video to user's watch history if not already present
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure watchHistory stores ObjectId type
    const videoObjectId = new mongoose.Types.ObjectId(pid); // Ensure 'new' is used here
    if (!user.watchHistory.includes(videoObjectId)) {
      user.watchHistory.push(videoObjectId);
      await user.save();
    }

    tcpTest(video._id, user._id); // Send video ID to the C++ server

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to get recommended videos for a user
const getRecommendedVideosController = async (req, res) => {

  const { id, pid } = req.params; // User ID

  try {
    const recommendedVideos = await getRecommendedVideos(id, pid);
    res.json(recommendedVideos);
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
  incrementVideoViews,
  getRecommendedVideosController
};
