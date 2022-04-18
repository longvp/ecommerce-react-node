'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        static associate(models) {

        }
    };
    Blog.init({
        name: DataTypes.STRING,
        image: DataTypes.TEXT,
        seo: DataTypes.STRING,
        content_HTML: DataTypes.TEXT('long'),
        content_Markdown: DataTypes.TEXT('long'),
        timeCreate: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Blog',
    });
    return Blog;
};