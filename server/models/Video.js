const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  views: { type: String, default: '0 views' },
  duration: { type: Number, required: true },
  uploadDate: { type: String, default: new Date().toLocaleDateString() },
  comments: [{ text: String, date: Date, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  uploader: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    profilePicture: { type: String, required: true }
  }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
