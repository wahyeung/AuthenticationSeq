const Sequelize = require('sequelize');
const User = require('../models/User');
const Friendship = require('../models/Friendship');

// Add a friend
const addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const userId = req.user.userId;

        // Check if the user is trying to add themselves as a friend
        if (userId === friendId) {
            return res.status(400).json({ message: 'You cannot add yourself as a friend' });
        }
        
        
        // Check if the friendId exists in the Users table
        const friend = await User.findByPk(friendId);
        if (!friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the friend already exists
        const friendship = await Friendship.findOne({
            where: { userId: req.user.userId, friendId }
        });

        if (friendship) {
            return res.status(400).json({ message: 'Already friends' });
        }

        // Create a new friendship
        await Friendship.create({ userId: req.user.userId, friendId });
        await Friendship.create({ userId: friendId, friendId: req.user.userId });

        res.status(201).json({ message: 'Friend added successfully' });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get friends list with mutual friends count
const getFriendsList = async (req, res) => {
    try {
        const friends = await Friendship.findAll({
            where: { userId: req.user.userId },
            include: [{
                model: User,
                as: 'Friend',
                attributes: ['id', 'username', 'email']
            }]
        });

        // Calculate mutual friends for each friend
        const friendsWithMutualCount = await Promise.all(friends.map(async friend => {
            const mutualFriendsCount = await Friendship.count({
                where: {
                    userId: friend.friendId,
                    friendId: {
                        [Sequelize.Op.in]: friends.map(f => f.friendId)
                    }
                }
            });

            return {
                ...friend.Friend.toJSON(),
                mutualFriendsCount
            };
        }));

        res.json(friendsWithMutualCount);
    } catch (error) {
        console.error('Error fetching friends list:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    addFriend,
    getFriendsList
};
