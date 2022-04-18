'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Blogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
            seo: {
                type: Sequelize.STRING
            },
            content_HTML: {
                type: Sequelize.TEXT('long')
            },
            content_Markdown: {
                type: Sequelize.TEXT('long')
            },
            timeCreate: {
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
        await queryInterface.dropTable('Blogs');
    }
};