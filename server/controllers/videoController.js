const {
  getVideos,
  createVideo,
  getUserVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  incrementViews
} = require('../services/videoService');
const upload = require('../utils/multerConfig.js');
const Video = require('../models/Video');
const net = require('net');

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
    res.status (500).json({ message: err.message });
  }
};

const tcpTest = async (videoID) => {
  const HOST = '192.168.245.128'; // Server IP address
const PORTTCP = 5555;        // Server port

// Create a TCP client
const client = new net.Socket();

// Connect to the server
client.connect(PORTTCP, HOST, () => {
    console.log(`Connected to server at ${HOST}:${PORTTCP}`);

    // Send a message to the server
    client.write(`Hello, server! This is a test message. ${videoID}`);
});

// Listen for data from the server
client.on('data', (data) => {
    console.log(`Received from server: ${data}`);

    // Close the connection after receiving the response
    client.end();
});

// Handle connection close
client.on('close', () => {
    console.log('Connection closed');
});

// Handle errors
client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});
}
const incrementVideoViews = async (req, res) => {
 
  const { id, pid } = req.params;

  try {
    const video = await incrementViews(id, pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    tcpTest(video._id)

    res.json(video);
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
  incrementVideoViews
};
