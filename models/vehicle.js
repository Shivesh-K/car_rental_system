const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');
const VehicleType = require('./vehicle-type');

const Vehicle = sequelize.define('Vehicle', {
    registrationNo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: 'registration_no'
    },
    brand: {
        type: DataTypes.STRING,
        field: 'brand',
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        field: 'model',
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER,
        field: 'type_id',
        allowNull: false,
        references: {
            model: VehicleType,
            key: 'id'
        }
    },
    color: {
        type: DataTypes.STRING,
        field: 'color'
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        field: 'is_available'
    }
}, {
    tableName: 'vehicles'
})

module.exports = Vehicle
