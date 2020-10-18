const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'email_id'
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
    },
    password: {
        type: DataTypes.STRING,
        field: 'password',
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    contactNo: {
        type: DataTypes.STRING,
        field: 'contact_no',
        unique: true
    },
    houseNo: {
        type: DataTypes.STRING,
        field: 'house_no'
    },
    street: {
        type: DataTypes.STRING,
        field: 'street'
    },
    city: {
        type: DataTypes.STRING,
        field: 'city'
    },
    state: {
        type: DataTypes.STRING,
        field: 'state'
    },
    zipcode: {
        type: DataTypes.STRING,
        field: 'zipcode',
    }
}, {
    tableName: 'users'
})

module.exports = User
