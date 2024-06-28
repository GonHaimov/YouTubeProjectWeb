// server/services/userService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async ({ username, password, email, profilePicture }) => {
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    throw new Error('User with this email already exists');
  }

  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    throw new Error('User with this username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    profilePicture,
  });

  return await newUser.save();
};

const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

const getUserById = async (userId) => {
  return await User.findById(userId).select('-password');
};

const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
};
