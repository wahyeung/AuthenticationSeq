const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Friendship = sequelize.define('Friendship', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    friendId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Friendship.associate = function(models) {
    Friendship.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
    Friendship.belongsTo(models.User, { as: 'Friend', foreignKey: 'friendId' });
};

module.exports = Friendship;
