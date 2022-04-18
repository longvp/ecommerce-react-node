'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.User, { foreignKey: 'role', as: 'roleData' })
            Allcode.hasMany(models.User, { foreignKey: 'statusAccount', as: 'statusAccountData' })

            Allcode.hasMany(models.Order, { foreignKey: 'statusOrder', as: 'statusOrderData' })
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};