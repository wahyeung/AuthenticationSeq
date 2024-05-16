const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with the specified database connection parameters
const sequelize = new Sequelize('restapi', 'postgres', 'admin', {
    host: 'localhost',  // Database host
    dialect: 'postgres',  // Database dialect
});

module.exports = sequelize;  // Export the sequelize instance for use in other parts of the application
