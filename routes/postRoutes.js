const express = require('express');
const { createPost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Configure multer to store uploaded files in memory

const router = express.Router();

// Define a POST route to create a new post
// This route requires authentication and handles a single photo upload
router.post('/create', authMiddleware, upload.single('photo'), createPost);

module.exports = router;
