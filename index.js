const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();

const sequelize = require('./services/sequelize')
const { User, Rental, Vehicle, VehicleType } = require('./models');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, './client/build')))


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
    const user = await User.create(req.body, { isNewRecord: true })
    res.send(user)
})

app.post('/user/:email/update', async (req, res) => {
    try {
        console.log(req.body)
        const [isUpdated] = await User.update(req.body, { where: { email: req.params.email } })
        // console.log(x)/
        if (isUpdated) {
            const user = await User.findByPk(req.params.email)
            res.send(user)
        }
        else {
            res.send(null)
        }
        // res.send(updatedUser)
    } catch (err) {
        console.log(err)
        res.send(null)
    }
})


// Rental related requests

app.get('/rental/all', async (req, res) => {
    res.send(await Rental.findAll())
})

app.post('/rental/add', async (req, res) => {
    res.send(await Rental.create(req.body))
})


// VehicleType related requests

app.get('/vehicletype/all', async (req, res) => {
    res.send(await VehicleType.findAll())
})

app.post('/vehicletype/add', async (req, res) => {
    res.send(await VehicleType.create(req.body))
})

// Vehicle related requests

app.get('/vehicle/all', async (req, res) => {
    res.send(await Vehicle.findAll())
})

app.post('/vehicle/add', async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const response = await Vehicle.create(req.body, { transaction: t })
        await VehicleType.increment('quantity', { where: { id: req.body.type }, transaction: t })
        t.commit()
        res.send(response)
    }
    catch (err) {
        await t.rollback()
        res.send(null)
    }
})

app.get('/vehicle/:id', async (req, res) => {
    res.send(await Vehicle.findByPk(req.params.id))
})

app.delete('/vehicle/:id/delete', async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const response = await Vehicle.findOne({ where: { registrationNo: req.params.id } })
        await response.update({ isAvailable: false }, { transaction: t })
        await VehicleType.decrement('quantity', { where: { id: response.dataValues.type }, transaction: t })
        t.commit()
        res.send(true)
    }
    catch (err) {
        console.log(err)
        await t.rollback()
        res.send(false)
    }
})

// For all the other requests
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

app.listen(process.env.PORT || 3000, () => console.log("Started the server!"))