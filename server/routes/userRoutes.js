// server/routes/userRoutes.js
const express = require('express');
const { register, login, getUsers, getUserById } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken'); // Import the middleware
const router = express.Router();

router.post('/users', register);
router.post('/tokens', login);
router.get('/users', getUsers); // New route for GET request
router.get('/users/:id', authenticateToken, getUserById); // Route for fetching user details by ID

module.exports = router;
