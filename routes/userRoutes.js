const express = require('express');
const { register, login, getUserInfo } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Define a POST route to register a new user
router.post('/register', register);

// Define a POST route for user login
router.post('/login', login);

// Define a GET route to fetch user information
// This route requires authentication
router.get('/userinfo', authMiddleware, getUserInfo);

module.exports = router;
