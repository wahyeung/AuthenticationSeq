const express = require('express');
const { addFriend, getFriendsList } = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to add a friend
router.post('/add', authMiddleware, addFriend);

// Route to get friends list
router.get('/gets', authMiddleware, getFriendsList);


module.exports = router;
