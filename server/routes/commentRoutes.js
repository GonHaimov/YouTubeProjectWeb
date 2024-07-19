const express = require('express');
const { addCommentController, editCommentController, deleteCommentController } = require('../controllers/commentController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/videos/:videoId/comments', authenticateToken, addCommentController);
router.patch('/videos/:videoId/comments/:commentId', authenticateToken, editCommentController);
router.delete('/videos/:videoId/comments/:commentId', authenticateToken, deleteCommentController);

module.exports = router;
