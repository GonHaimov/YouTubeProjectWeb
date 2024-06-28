const express = require('express');
const { register, login, getUserDetailsById, updateUserController, deleteUserController, getUserVideos } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/users', register);
router.post('/tokens', login);
router.get('/users/:id', authenticateToken, getUserDetailsById);
router.patch('/users/:id', authenticateToken, updateUserController);
router.delete('/users/:id', authenticateToken, deleteUserController);
router.get('/users/:id/videos', authenticateToken, getUserVideos); // New route for fetching user videos

module.exports = router;
