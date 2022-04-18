'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'categoryData' })

            Product.belongsToMany(models.Order, { through: models.Order_Product, foreignKey: 'productId', as: 'productData' })
        }
    };
    Product.init({
        name: DataTypes.STRING,
        priceOrigin: DataTypes.STRING,
        priceSale: DataTypes.STRING,
        totalQuantity: DataTypes.STRING,
        image: DataTypes.TEXT,
        seo: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        categorySeo: DataTypes.STRING,
        specific_HTML: DataTypes.TEXT('long'),
        specific_Markdown: DataTypes.TEXT('long'),
        descript_HTML: DataTypes.TEXT('long'),
        descript_Markdown: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};