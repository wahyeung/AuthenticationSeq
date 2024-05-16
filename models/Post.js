const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

// Define the Post model
const Post = sequelize.define('Post', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Define the association between Post and User models
Post.associate = function(models) {
    Post.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = Post;
