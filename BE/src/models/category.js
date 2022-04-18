'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'categoryData' })
        }
    };
    Category.init({
        name: DataTypes.STRING,
        image: DataTypes.TEXT,
        seo: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};