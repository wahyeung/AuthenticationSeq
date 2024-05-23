'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Posts', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        });
        await queryInterface.changeColumn('Posts', 'photoUrl', {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Posts', 'createdAt');
        await queryInterface.changeColumn('Posts', 'photoUrl', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    }
};
