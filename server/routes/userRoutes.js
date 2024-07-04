// server/routes/userRoutes.js
const express = require('express');
const { register, login, getUserDetailsById, updateUserController, deleteUserController } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/users', register);
router.post('/tokens', login);
router.get('/users/:id', authenticateToken, getUserDetailsById);
router.patch('/users/:id', authenticateToken, updateUserController);
router.delete('/users/:id', authenticateToken, deleteUserController);

module.exports = router;
