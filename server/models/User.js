const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  watchHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }] // Add this field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
