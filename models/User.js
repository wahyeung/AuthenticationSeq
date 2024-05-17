const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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

User.associate = function(models) {
    User.hasMany(models.Post, { foreignKey: 'userId' });
};

module.exports = User;
