'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            fullname: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            phonenumber: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
            seo: {
                type: Sequelize.STRING
            },
            statusAccount: {
                type: Sequelize.STRING
            },
            token: {
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
        await queryInterface.dropTable('Users');
    }
};