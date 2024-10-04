const express = require('express');
const {
  getVideosController,
  createVideoController,
  getUserVideosController,
  getVideoByIdController,
  updateVideoController,
  deleteVideoController,
  incrementVideoViews,
  getRecommendedVideosController 
} = require('../controllers/videoController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/videos', getVideosController);
router.post('/users/:id/videos', authenticateToken, createVideoController);
router.get('/users/:id/videos', getUserVideosController);
router.get('/users/:id/videos/:pid', getVideoByIdController);
router.patch('/users/:id/videos/:pid', authenticateToken, updateVideoController);
router.delete('/users/:id/videos/:pid', authenticateToken, deleteVideoController);
router.patch('/users/:id/videos/:pid/views', incrementVideoViews); // New route for incrementing views
router.get('/users/:id/videos/recommended/:pid', getRecommendedVideosController);

module.exports = router;
