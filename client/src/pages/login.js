import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import { Button, Container, TextField, Typography, Paper } from '@material-ui/core'

import { login } from '../helpers/auth'
import { validateEmail, validatePassword } from '../helpers/validation'

export default function Login(props) {

    const [state, setState] = useState(() => ({
        email: "",
        password: "",
    }))
    const [error, setError] = useState(() => "")
    const [redirect, setRedirect] = useState("")

    useEffect(() => {
        cookie.load('user') && setRedirect(() => '/home')
    }, [])

    const handleChange = (e) => {
        e.persist()
        setState(() => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateEmail(state.email) && validatePassword(state.password)) {
            console.log("Correct")
            setError(() => "")
        } else {
            setError(() => "Invalid credentials!")
            return
        }

        const { isLoggedIn } = await login({
            email: state.email,
            password: state.password
        })
        console.log(isLoggedIn)
        if (isLoggedIn) {
            const redirect = props.location.state ? props.location.state.from.pathname : '/home'
            setRedirect(() => redirect)
        }
    }

    return (
        redirect !== "" ?
            (
                <Redirect to={{
                    pathname: redirect,
                    state: {
                        from: props.location,
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
                    <Paper style={{ padding: 16 }}>
                        <Typography variant="h4" style={{ textAlign: "center", marginBottom: 32 }}>Login</Typography>
                        <form>
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                variant="outlined"
                                style={{
                                    display: "block",
                                    margin: 8
                                }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                variant="outlined"
                                style={{
                                    display: "block",
                                    margin: 8
                                }}
                            />
                            <Container
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    marginTop: 16,
                                    padding: 0
                                }}
                            >
                                <Button
                                    onClick={() => setRedirect('/signup')}
                                    style={{ margin: 8, padding: 8 }}
                                >
                                    Signup
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
