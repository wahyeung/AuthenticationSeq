const { Storage } = require('@google-cloud/storage');
const path = require('path');
const Post = require('../models/Post');

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

const createPost = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No photo uploaded');
        }
        if (!req.body.description) {
            return res.status(400).send('Description is required');
        }
        // Create a reference to the new file in the bucket
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        // Handle errors during the upload to GCP
        blobStream.on('error', err => {
            console.error('Error in blobStream:', err);
            return res.status(500).send('Error uploading photo to GCP');
        });

        // After the file upload completes
        blobStream.on('finish', async () => {
            // Construct the public URL of the uploaded photo
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            try {
                // Create a new post record in the database
                const post = await Post.create({
                    userId: req.user.userId,
                    description: req.body.description,
                    photoUrl: publicUrl
                });
                res.status(201).json({ message: 'Post created successfully', post });
            } catch (error) {
                console.error('Error saving post:', error);
                res.status(500).send('Server Error');
            }
        });
        // End the stream and upload the file
        blobStream.end(req.file.buffer);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server Error while creating post', error });
    }
};

module.exports = {
    createPost,
};
