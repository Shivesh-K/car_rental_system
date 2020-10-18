const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const sequelize = require('./services/sequelize.js');
const { User, Rental, Vehicle, VehicleType } = require('./models')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


// User related requests

app.get('/user/:email', async (req, res) => {
    const user = await User.findByPk(req.params.email)
    res.send(user)
})

app.get('/user/:email/rentals', async (req, res) => {
    const all = await Rental.findAll({ where: { email: req.params.email } })
    res.send(all)
})

app.post('/user/add', async (req, res) => {
    res.send(await User.create(req.body))
})


// Rental related requests

app.get('/rental/all', async (req, res) => {
    res.send(await Rental.findAll())
})

app.post('/rental/add', async (req, res) => {
    res.send(await Rental.create(req.body))
})


// VehicleType related requests

app.post('/vehicletype/add', async (req, res) => {
    res.send(await VehicleType.create(req.body))
})

// Vehicle related requests

app.get('/vehicle/:id', async (req, res) => {
    res.send(await Vehicle.findByPk(req.params.id))
})

app.get('/vehicle/all', async (req, res) => {
    res.send(await Vehicle.findAndCountAll())
})

app.post('/vehicle/add', async (req, res) => {
    res.send(await Vehicle.create(req.body))
})


app.listen(3000, () => console.log("Started the server!"))