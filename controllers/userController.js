const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
         // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);

        // Send the token as a response
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get user info
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send the user info as a response
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    register,
    login,
    getUserInfo,
};
