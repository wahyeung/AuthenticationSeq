const jwt = require('jsonwebtoken');

// Middleware to authenticate a user based on JWT token
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization');
    if (!token) {
        // If no token is provided, respond with an access denied message
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        // If the token is invalid, respond with an invalid token message
        res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
