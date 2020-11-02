import React, { Fragment, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import { Container, Paper, Typography, Button, CircularProgress, FormControl, FormControlLabel, RadioGroup, Radio, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getAllCars, addRental, getRentalRates } from '../helpers/data'
import CustomAppBar from '../components/AppBar'

const useStyles = makeStyles({
    main: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },

    heading: {
        textAlign: "center",
        margin: 16
    },

    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },

    btnPrimary: {
        margin: 8,
        backgroundColor: "orange",
    }
})

function NewRental(props) {

    const classes = useStyles()

    const [cars, setCars] = useState(() => ({}))
    const [items, setItems] = useState(() => ([]))
    const [data, setData] = useState(() => ({
        registrationNo: "",
        start: "",
        end: "",
        amount: 0
    }))
    const [rentalRates, setRentalRates] = useState(0)
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState(1)
    const [redirect, setRedirect] = useState("")

    useEffect(() => {
        (async () => {
            const cars = await getAllCars()

            const rentalRates = await getRentalRates()

            var radioItems = []
            for (let key of Object.keys(cars)) {
                const value = cars[key]
                var radios = []
                value.forEach(element => {
                    element.isAvailable && radios.push(
                        <FormControlLabel
                            key={element.registrationNo}
                            value={element.registrationNo}
                            control={<Radio />}
                            label={
                                <Fragment>
                                    <Typography style={{ display: "inline" }}>
                                        {`${element.brand} ${element.model}   `}
                                    </Typography>
                                    <Typography
                                        style={{
                                            display: "inline",
                                            fontSize: "0.8rem",
                                            fontWeight: "bold",
                                            color: "grey"
                                        }}
                                    >
                                        {`${element.color}   (${element.registrationNo})`}
                                    </Typography>
                                </Fragment>
                            }
                            onClick={e => {
                                handleChange(e)
                                setType(element.type)
                            }}
                        />
                    )
                })
                radioItems.push(
                    <RadioGroup key={key} name="registrationNo" >
                        {radios}
                    </RadioGroup>
                )
            }

            setCars(() => cars)
            setItems(() => (
                <FormControl component="fieldset">
                    {radioItems}
                </FormControl>
            ))
            setRentalRates(() => rentalRates)
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        const amount = computeAmount(data.start, data.end, rentalRates, type)
        setData(curr => ({
            ...curr,
            amount
        }))

    }, [data.registrationNo, data.start, data.end])

    const computeAmount = (start, end, rentalRates, type) => {
        var d1 = new Date(start)
        var d2 = new Date(end)
        var dt = d2.getTime() - d1.getTime()
        var dd = dt / (1000 * 3600 * 24) + 1;
        let rate = 0
        if (rentalRates && rentalRates.find(el => el.id === type)) {
            rate = rentalRates.find(el => el.id === type).pricePerDay
        }

        var amount = (cars)
            ? dd * rate
            : 0
        if (!amount) amount = 0

        return amount
    }

    const handleChange = e => {
        e.persist()
        console.log(e.target.name)
        console.log(e.target.value)
        setData(curr => ({
            ...curr,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (data.amount <= 0) {
            return
        }
        await addRental({ ...data, email: cookie.load('user').email })
        setRedirect('/home')
    }

    return (
        redirect !== "" ? (
            <Redirect to={{
                pathname: redirect,
                state: {
                    from: props.pathname,
                }
            }} />
        ) : (
                <Fragment>
                    <CustomAppBar goHome={() => setRedirect('/home')} />

                    <Container className={classes.main}>
                        <Paper variant="outlined">
                            <Typography
                                variant="h4"
                                className={classes.heading}
                            >
                                New Rental
                            </Typography>

                            <form
                                style={{
                                    padding: 16
                                }}
                            >

                                <Paper variant="outlined">
                                    <Container className={classes.row}>
                                        <Paper
                                            onClick={() => setType(1)}
                                            variant={type === 1 ? "elevation" : "outlined"}
                                            style={{
                                                margin: 8,
                                                padding: 8,
                                            }}
                                        >
                                            <Typography variant="body1">Hatchback</Typography>
                                            <Typography style={{ font: "small-caption", textAlign: "center" }}>
                                                {`Rs. ${rentalRates ? rentalRates[0].pricePerDay : 0}/day`}
                                            </Typography>
                                        </Paper>
                                        <Paper
                                            onClick={() => setType(2)}
                                            variant={type === 2 ? "elevation" : "outlined"}
                                            style={{
                                                margin: 8,
                                                padding: 8,
                                            }}
                                        >
                                            <Typography variant="body1">Sedan</Typography>
                                            <Typography style={{ font: "small-caption", textAlign: "center" }}>
                                                {`Rs. ${rentalRates ? rentalRates[1].pricePerDay : 0}/day`}
                                            </Typography>
                                        </Paper>
                                        <Paper
                                            onClick={() => setType(3)}
                                            variant={type === 3 ? "elevation" : "outlined"}
                                            style={{
                                                margin: 8,
                                                padding: 8,
                                            }}
                                        >
                                            <Typography variant="body1">SUV</Typography>
                                            <Typography style={{ font: "small-caption", textAlign: "center" }}>
                                                {`Rs. ${rentalRates ? rentalRates[2].pricePerDay : 0}/day`}
                                            </Typography>
                                        </Paper>
                                    </Container>
                                    <Container
                                        style={{
                                            // margin: 8,
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {
                                            !loading
                                                ? items.props.children[type - 1]
                                                : <CircularProgress />
                                        }
                                    </Container>
                                </Paper>

                                <Container
                                    style={{
                                        margin: 8,
                                        padding: 0,
                                        justifyContent: "space-around"
                                    }}
                                >
                                    <TextField
                                        label="Start Date"
                                        name="start"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleChange}
                                        style={{
                                            margin: 8
                                        }}
                                    />

                                    <TextField
                                        label="End Date"
                                        name="end"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleChange}
                                        style={{
                                            margin: 8
                                        }}
                                    />
                                </Container>

                                <Container
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        style={{
                                            margin: 16,
                                            fontSize: "1.6rem",
                                            fontWeight: "lighter"
                                        }}
                                    >
                                        Rs. {data.amount}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Book
                                    </Button>
                                </Container>
                            </form>
                        </Paper>
                    </Container>
                </Fragment>
            )
    )
}

export default NewRental
