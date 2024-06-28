const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ text: String, date: Date, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
