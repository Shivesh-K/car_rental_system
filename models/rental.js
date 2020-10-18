const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');
const User = require('./user');
const Vehicle = require('./vehicle');

const Rental = sequelize.define('Rental', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'rental_id',
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        field: 'email_id',
        allowNull: false,
        references: {
            model: User,
            key: 'email_id'
        }
    },
    registrationNo: {
        type: DataTypes.STRING,
        field: 'registration_no',
        allowNull: false,
        references: {
            model: Vehicle,
            key: 'registration_no'
        }
    },
    start: {
        type: DataTypes.DATE,
        field: 'start_date',
    },
    end: {
        type: DataTypes.DATE,
        field: 'end_date',
    },
    amount: {
        type: DataTypes.INTEGER,
        field: 'amount'
    }
}, {
    tableName: 'rentals'
})

module.exports = Rental
