import React, { useState, useEffect } from 'react'
import cookie from 'react-cookies'
import { Redirect } from 'react-router-dom'
import { Button, Container, Paper, TextField, Typography } from '@material-ui/core'

import { signup } from '../helpers/auth'
import { validateCity, validateContactNo, validateEmail, validateName, validateHouseNo, validatePassword, validateSreet, validateState, validateZipcode } from '../helpers/validation'

function Signup(props) {

    const [state, setState] = useState(() => ({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactNo: "",
        houseNo: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
    }))
    const [error, setError] = useState(() => "")
    // const [user, setUser] = useState(() => null)
    const [redirect, setRedirect] = useState(() => "")

    useEffect(() => {
        cookie.load('user') && setRedirect(() => '/home')
    }, [])

    const handleChange = e => {
        e.persist()
        setState(() => ({
            ...state,
            [e.target.name]: e.target.value
        }))
        console.log(state)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (validateEmail(state.email)
            && validatePassword(state.password)
            && validateName(state.firstName)
            && validateName(state.lastName)
            && validateContactNo(state.contactNo)
            && validateHouseNo(state.houseNo)
            && validateSreet(state.street)
            && validateCity(state.city)
            && validateState(state.state)
            && validateZipcode(state.zipcode)
        ) {
            console.log("Correct")
            setError(() => "")
        } else {
            setError(() => "Invalid credentials!")
            return
        }

        const { isSignedUp } = await signup(state)

        if (isSignedUp) {
            setRedirect(() => '/home')
        }
    }

    return (
        redirect !== "" ?
            (
                <Redirect to={{
                    pathname: redirect,
                    state: {
                        from: props.location,
                        // user: user
                    }
                }} />
            ) : (
                <Container
                    style={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Paper
                        style={{
                            padding: 16,
                            width: "fit-content"
                        }}
                    >
                        <Typography
                            variant="h4"
                            style={{
                                marginBottom: 32,
                                textAlign: "center"
                            }}
                        >
                            Signup
                        </Typography>
                        <form>
                            <Container>
                                <TextField
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.email}
                                    style={{ margin: 8 }}
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.password}
                                    style={{ margin: 8 }}
                                />
                            </Container>
                            <Container>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.firstName}
                                    style={{ margin: 8 }}
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.lastName}
                                    style={{ margin: 8 }}
                                />
                            </Container>
                            <Container>
                                <TextField
                                    label="Contact Number"
                                    name="contactNo"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.contactNo}
                                    style={{ margin: 8 }}
                                />
                            </Container>
                            <Container>
                                <TextField
                                    label="House Number"
                                    name="houseNo"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.houseNo}
                                    style={{ margin: 8 }}
                                />
                                <TextField
                                    label="Street"
                                    name="street"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.street}
                                    style={{ margin: 8 }}
                                />
                            </Container>
                            <Container>
                                <TextField
                                    label="City"
                                    name="city"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.city}
                                    style={{ margin: 8 }}
                                />
                                <TextField
                                    label="State"
                                    name="state"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.state}
                                    style={{ margin: 8 }}
                                />
                                <TextField
                                    label="ZIP Code"
                                    name="zipcode"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={state.zipcode}
                                    style={{ margin: 8 }}
                                />
                            </Container>
                            <Container
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <Button
                                    onClick={() => setRedirect('/login')}
                                    style={{ margin: 8 }}
                                >
                                    Login
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSubmit}
                                    style={{ margin: 8 }}
                                >
                                    Submit
                                </Button>
                            </Container>
                        </form>
                    </Paper>
                </Container>
            )
    )
}

export default Signup
