const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoFile: { type: String, required: true },
  thumbnail: { type: String, required: true },
  views: { type: Number, default: 0 },
  duration: { type: Number, required: true },
  uploadDate: { type: String, default: new Date().toLocaleDateString() },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false 
  }],
  uploader: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // this is the one that upload the video.
    username: { type: String, required: true },
    profilePicture: { type: String, required: true }
  }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
