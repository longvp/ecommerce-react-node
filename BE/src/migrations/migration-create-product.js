'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            priceOrigin: {
                type: Sequelize.STRING
            },
            priceSale: {
                type: Sequelize.STRING
            },
            totalQuantity: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
            seo: {
                type: Sequelize.STRING
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            categorySeo: {
                type: Sequelize.STRING
            },
            specific_HTML: {
                type: Sequelize.TEXT('long')
            },
            specific_Markdown: {
                type: Sequelize.TEXT('long')
            },
            descript_HTML: {
                type: Sequelize.TEXT('long')
            },
            descript_Markdown: {
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('Products');
    }
};