require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');

User.associate({ Post });
Post.associate({ User });

const PORT = process.env.PORT || 3000;

// Sync the database and start the server
sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
