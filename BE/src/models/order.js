'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userData' })

            Order.belongsTo(models.Allcode, { foreignKey: 'statusOrder', targetKey: 'keyMap', as: 'statusOrderData' })

            Order.belongsToMany(models.Product, { through: models.Order_Product, foreignKey: 'orderId', as: 'productData' })
        }
    };
    Order.init({
        code: DataTypes.STRING,
        totalPrice: DataTypes.STRING,
        statusOrder: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        timeOrder: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};