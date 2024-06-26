// server/routes/videoRoutes.js
const express = require('express');
const { getVideosController, createVideoController } = require('../controllers/videoController');
const router = express.Router();

router.get('/', getVideosController);
router.post('/', createVideoController);

module.exports = router;
