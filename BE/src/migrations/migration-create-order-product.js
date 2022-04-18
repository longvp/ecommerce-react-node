'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Order_Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            orderId: {
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER
            },
            quantity: {
                type: Sequelize.STRING
            },
            priceUnit: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Order_Products');
    }
};