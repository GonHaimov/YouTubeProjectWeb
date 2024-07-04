// server/controllers/userController.js
const { registerUser, loginUser, getUserById, updateUser, deleteUser } = require('../services/userService');
const Video = require('../models/Video');

const register = async (req, res) => {
  const { username, password, email, profilePicture } = req.body;

  try {
    const savedUser = await registerUser({ username, password, email, profilePicture });
    res.status(200).json(savedUser);
  } catch (err) {
    if (err.message.includes('exists')) {
      res.status(409).json({ message: err.message });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await loginUser({ username, password });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserDetailsById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await updateUser(id, updateData);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    await Video.deleteMany({ 'uploader.id': id }); // Delete user's videos
    await deleteUser(id); // Delete user
    res.status(200).json({ message: 'User and associated videos deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  getUserDetailsById,
  updateUserController,
  deleteUserController,
};
