const { Sequelize, Model } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
    config.DATABASE,
    config.USERNAME,
    config.PASSWORD,
    {
        dialect: 'mysql',
        host: config.HOST,
    }
)

module.exports = sequelize;