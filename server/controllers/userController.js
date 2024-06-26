// server/controllers/userController.js
const { registerUser, loginUser } = require('../services/userService');

const register = async (req, res) => {
  const { username, password, email, profilePicture } = req.body;

  try {
    const savedUser = await registerUser({ username, password, email, profilePicture });
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await loginUser({ email, password });
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
};
