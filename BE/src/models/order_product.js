'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order_Product extends Model {
        static associate(models) {

        }
    };
    Order_Product.init({
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.STRING,
        priceUnit: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order_Product',
    });
    return Order_Product;
};