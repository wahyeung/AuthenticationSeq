const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to log the request path
app.use((req, res, next) => {
    console.log(`Request Path: ${req.path}`);
    next();
});

// Routes for user-related requests
app.use('/users', userRoutes);

// Routes for post-related requests
app.use('/posts', postRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
