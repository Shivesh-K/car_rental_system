import React, { Fragment, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Typography, Paper, TextField, FormControl, RadioGroup, Radio, FormControlLabel, Button, CircularProgress, List, ListItemSecondaryAction, ListItemText, ListItem, ListSubheader, IconButton, Divider } from '@material-ui/core'
import { DeleteRounded } from '@material-ui/icons'

import { addCar, deleteCar, getAllCars } from '../helpers/data'
import { validateBrand, validateColor, validateModel, validateRegistrationNo, validateType } from '../helpers/validation'
import CustomAppBar from '../components/AppBar'

function Admin(props) {

    const [cars, setCars] = useState(() => null)
    const [formData, setFormData] = useState(() => ({
        brand: "",
        model: "",
        registrationNo: "",
        type: 1,
        color: ""
    }))
    const [redirect, setRedirect] = useState("")

    useEffect(() => {
        (async () => {
            var cars = await getAllCars()
            Object.keys(cars).forEach(key => {
                cars[key] = (cars[key]).filter(car => car.isAvailable)
            })
            setCars(() => cars)
        })()
    }, [])

    const handleChange = e => {
        e.persist()
        console.log(e)
        setFormData(curr => ({
            ...curr,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (validateBrand(formData.brand)
            && validateModel(formData.model)
            && validateRegistrationNo(formData.registrationNo)
            && validateType(parseInt(formData.type))
            && validateColor(formData.color)
        ) { }
        else {
            console.log("Invalid credentials")
            return
        }

        const newCar = await addCar(formData)
        if (newCar) window.location.reload()
    }

    const removeCar = async (registrationNo) => {
        if (await deleteCar(registrationNo)) {
            window.location.reload()
        }

    }

    return (
        redirect !== ''
            ? (
                <Redirect to={{
                    pathname: redirect,
                    state: { from: props.location }
                }} />
            ) : (
                <Fragment>

                    <CustomAppBar goHome={() => setRedirect('/home')} />

                    <Container style={{ minHeight: "100vh", paddingTop: "4em" }}>
                        <Typography variant="h3">Admin</Typography>

                        <Paper variant="outlined" style={{ margin: 16, padding: 16, width: "fit-content" }}>
                            <Typography variant="h5" style={{ margin: 8 }}>Add a new car</Typography>
                            <form>
                                <TextField
                                    label="Brand"
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    variant="outlined"
                                    style={{ margin: 8, }}
                                />

                                <TextField
                                    label="Model"
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                />

                                <TextField
                                    label="Registration Number"
                                    type="text"
                                    placeholder="RJ-01-FC-3934"
                                    name="registrationNo"
                                    value={formData.registrationNo}
                                    onChange={handleChange}
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                />

                                <FormControl component="fieldset" style={{ margin: 8, display: "block" }}>
                                    <RadioGroup name="type" value={parseInt(formData.type)} style={{ display: "inline" }} >
                                        <FormControlLabel
                                            key="hatchback"
                                            value={1}
                                            control={<Radio />}
                                            label={<Typography>Hatchback</Typography>}
                                            onClick={handleChange}
                                        />
                                        <FormControlLabel
                                            key="sedan"
                                            value={2}
                                            control={<Radio />}
                                            label={<Typography>Sedan</Typography>}
                                            onClick={handleChange}
                                        />
                                        <FormControlLabel
                                            key="suv"
                                            value={3}
                                            control={<Radio />}
                                            label={<Typography>SUV</Typography>}
                                            onClick={handleChange}
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <TextField
                                    label="Color"
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    variant="outlined"
                                    style={{ margin: 8 }}
                                />

                                <Button
                                    variant="contained"
                                    type="submit"
                                    onClick={handleSubmit}
                                    style={{ margin: 8, marginLeft: "auto", marginRight: "auto", display: "block", }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Paper>

                        <Typography variant="h5" style={{ marginTop: 32 }}>Car List</Typography>
                        {
                            cars
                                ? (
                                    <List subheader={<li />} dense={true}>
                                        {
                                            Object.keys(cars).map(key => {
                                                if (cars[key].length) {
                                                    return (
                                                        (
                                                            <li key={key}>
                                                                <ul>
                                                                    <ListSubheader>{`${key.toUpperCase()} • ${cars[key].length}`}</ListSubheader>
                                                                    {
                                                                        cars[key].map(car => (
                                                                            <ListItem key={car.registrationNo}>
                                                                                <ListItemText
                                                                                    primary={`${car.brand} ${car.model}`}
                                                                                    secondary={`${car.registrationNo} | ${car.color}`}
                                                                                />
                                                                                <ListItemSecondaryAction>
                                                                                    <IconButton onClick={() => removeCar(car.registrationNo)}>
                                                                                        <DeleteRounded />
                                                                                    </IconButton>
                                                                                </ListItemSecondaryAction>
                                                                            </ListItem>
                                                                        ))
                                                                    }
                                                                </ul>
                                                                <Divider />
                                                            </li>
                                                        )
                                                    )
                                                }
                                            })
                                        }
                                    </List>
                                ) : (
                                    <Container style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                        <CircularProgress />
                                    </Container>
                                )
                        }

                    </Container>
                </Fragment>
            )
    )
}

export default Admin
