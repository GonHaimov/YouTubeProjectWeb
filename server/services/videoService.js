const Video = require('../models/Video');
const mongoose = require('mongoose');
const User = require('../models/User');
const net = require('net')

const getVideos = async () => {
  try {
    // Fetch the top 10 most popular videos by views
    const topVideos = await Video.find().sort({ views: -1 }).limit(10);

    // Get the IDs of the top videos
    const topVideoIds = topVideos.map(video => video._id);

    // Fetch 10 random videos excluding the top videos
    const randomVideos = await Video.aggregate([
      { $match: { _id: { $nin: topVideoIds } } },
      { $sample: { size: 10 } }
    ]);

    // Combine both sets of videos
    let combinedVideos = [...topVideos, ...randomVideos];

    // Shuffle the combined array
    combinedVideos = combinedVideos.sort(() => Math.random() - 0.5);

    return combinedVideos;
  } catch (error) {
    throw new Error('Error fetching videos');
  }
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

const tcpCall = async (videoID, userId) => {
  const HOST = '192.168.245.128'; // Server IP address
  const PORTTCP = 5555;           // Server port

  return new Promise((resolve, reject) => {
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
      resolve(data.toString());
      client.end(); // Close the connection after receiving the response
    });

    client.on('close', () => {
      console.log('Connection closed');
    });

    client.on('error', (err) => {
      console.error(`Error: ${err.message}`);
      reject(err); // Reject the Promise in case of an error
    });
  });
};



const getRecommendedVideos = async (userId, videoId) => {

  try {
  
    console.log(userId)
    if (userId == '0') {
      // If the user is not found, return the top 10 most viewed videos
      const topVideos = await Video.find().sort({ views: -1 }).limit(10);
      console.log("Top 10 most viewed videos for guest:", topVideos);  // Check top videos
      return topVideos;
    }
    const guest = await User.findById(userId);

    const video = await Video.findById(videoId);
    if (!video) {
      return { message: 'Video not found' };
    }


    // Simulate the TCP call to the C++ server to get a list of recommended video IDs
    const listVideos = await tcpCall(guest._id, video._id);  // Example: "video1 video2 video3"
    

    // Split the string of video IDs into an array
    let videoIds = listVideos.trim().split(' ');  // This will return an array like ['video1', 'video2', 'video3']
    console.log("hi",videoIds)
    videoIds = videoIds.filter(id => id !== videoId);

    // Find the videos by their IDs
    let recommendedVideos = await Video.find({ _id: { $in: videoIds } }).sort({ views: -1 });
    console.log("Recommended videos based on tcpCall:", recommendedVideos);  // Check recommended videos

    // If there are fewer than 10 videos, complete the list with the most viewed videos
    if (recommendedVideos.length < 10) {
      const remainingCount = 10 - recommendedVideos.length;
      
      // Find additional top viewed videos that are not in the current recommended list
      const additionalVideos = await Video.find({ _id: { $nin: [...videoIds, videoId] } })
        .sort({ views: -1 })
        .limit(remainingCount);
      
      // Combine both lists
      recommendedVideos = [...recommendedVideos, ...additionalVideos];
    }

    // Return only the top 10 videos
    return recommendedVideos.slice(0, 10);

  } catch (err) {
    console.error("Error fetching recommended videos:", err);
    throw new Error('Error fetching recommended videos');
  }
};



module.exports = {
  getVideos,
  createVideo,
  getUserVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  incrementViews,
  getRecommendedVideos
};
