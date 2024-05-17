const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const Friendship = require('./Friendship');

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Set up associations between models
User.associate = function(models) {
    User.hasMany(models.Post, { foreignKey: 'userId' });

    // Use unique aliases for each association
    User.belongsToMany(models.User, {
        through: models.Friendship,
        as: 'Friends',
        foreignKey: 'userId',
        otherKey: 'friendId'
    });
    
    User.belongsToMany(models.User, {
        through: models.Friendship,
        as: 'FriendOf',
        foreignKey: 'friendId',
        otherKey: 'userId'
    });
};

module.exports = User;
