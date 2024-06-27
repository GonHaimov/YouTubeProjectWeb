const { registerUser, loginUser } = require('../services/userService');
const User = require('../models/User');

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

// Handler for GET request
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// New handler for GET request by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserById, // Export the new getUserById function
};
