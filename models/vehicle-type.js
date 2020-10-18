const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const VehicleType = sequelize.define('VehicleType', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'type_id'
    },
    pricePerDay: {
        type: DataTypes.INTEGER,
        field: 'price_per_day',
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        field: 'type',
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        field: 'quantity',
        defaultValue: 0
    }
}, {
    tableName: 'vehicle_types'
})

module.exports = VehicleType
