const express = require('express');
const { createPost, getPosts, updatePostDescription } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route to create a new post, with up to 5 photos
router.post('/create', authMiddleware, upload.array('photos', 5), createPost);

// Route to get all posts
router.get('/get', authMiddleware, getPosts);

// Route to update a post's description
router.put('/update-description', authMiddleware, updatePostDescription);

module.exports = router;
