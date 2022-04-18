'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
            User.belongsTo(models.Allcode, { foreignKey: 'role', targetKey: 'keyMap', as: 'roleData' })
            User.belongsTo(models.Allcode, { foreignKey: 'statusAccount', targetKey: 'keyMap', as: 'statusAccountData' })

            User.hasMany(models.Order, { foreignKey: 'userId', as: 'userData' })
        }
    };
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        fullname: DataTypes.STRING,
        address: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        role: DataTypes.STRING,
        gender: DataTypes.STRING,
        image: DataTypes.TEXT,
        seo: DataTypes.STRING,
        statusAccount: DataTypes.STRING,
        token: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};