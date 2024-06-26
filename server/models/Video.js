const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  views: { type: Number, required: true },
  duration: { type: Number, required: true },
  uploadDate: { type: Date, required: true },
  comments: { type: Array, default: [] },
  uploader: { type: String, required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
