const { Storage } = require('@google-cloud/storage');
const path = require('path');
const Post = require('../models/Post');
const User = require('../models/User');
const moment = require('moment');  // Used for calculating time difference

// Ensure the GCP key file is defined
if (!process.env.GCP_KEY_FILE) {
    throw new Error('GCP_KEY_FILE environment variable is not defined');
}

// Create a new Storage instance with the specified key file
const storage = new Storage({
    keyFilename: path.resolve(__dirname, process.env.GCP_KEY_FILE)
});

// Reference to the GCP bucket
const bucket = storage.bucket('authseq_bucket');

// Function to create a post
const createPost = async (req, res) => {
    try {
        // Check if any photos were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No photos uploaded');
        }
        // Check if a description was provided
        if (!req.body.description) {
            return res.status(400).send('Description is required');
        }

        if (req.files.length > 5) {
            return res.status(400).send('A post can have at most 5 photos')
        }

        const photoUrls = []; // Array to store photo URLs

        // Loop through each uploaded file
        for (const file of req.files) {
            const blob = bucket.file(file.originalname);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            // Upload each file to GCP
            await new Promise((resolve, reject) => {
                blobStream.on('error', err => {
                    console.error('Error in blobStream:', err);
                    reject('Error uploading photo to GCP');
                });

                blobStream.on('finish', () => {
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    photoUrls.push(publicUrl); // Add the public URL of each photo to the array
                    resolve();
                });

                blobStream.end(file.buffer);
            });
        }

        // Create a new post in the database
        const post = await Post.create({
            userId: req.user.userId,
            description: req.body.description,
            photoUrls: photoUrls, // Store multiple photo URLs
        });

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server Error while creating post', error });
    }
};


// Function to get all posts with pagination Req3
const getPosts = async (req, res) => {
    try {
        // Get page and limit from query parameters (default to 1 and 10 if not provided)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows: posts } = await Post.findAndCountAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });

        // Calculate the time difference for each post
        const result = posts.map(post => {
            const timeDiff = moment(post.createdAt).fromNow();
            return {
                ...post.toJSON(),
                timeDiff // Add the time difference information
            };
        });

        res.json({
            totalPosts: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            posts: result
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Function to update the description of a post
const updatePostDescription = async (req, res) => {
    try {
        const { postId, description } = req.body;
        const post = await Post.findByPk(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is authorized to update the post
        if (post.userId !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Update the post description
        post.description = description;
        await post.save();

        res.json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createPost,
    getPosts,
    updatePostDescription,
};
