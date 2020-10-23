const User = require('./user');
const Vehicle = require('./vehicle');
const VehicleType = require('./vehicle-type');
const Rental = require('./rental');

Vehicle.belongsTo(VehicleType, {
    foreignKey: 'type_id',
})

Rental.belongsTo(User, {
    foreignKey: 'email_id'
})
Rental.belongsTo(Vehicle, {
    foreignKey: 'registration_no'
})

// const x = [
//     User.sync({ alter: true }),
//     VehicleType.sync({ alter: true }),
//     Vehicle.sync({ alter: true }),
//     Rental.sync({ alter: true })
// ]

// Promise.all(x)

module.exports = { User, Vehicle, VehicleType, Rental };
