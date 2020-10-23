import React, { useState, useEffect } from 'react'
import cookie from 'react-cookies'
import { Redirect } from 'react-router-dom'

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

        const { isSignedUp, user } = await signup(state)

        if (isSignedUp) {
            console.log(props)
            // setUser(() => user)
            cookie.save('user', user, {
                path: '/',
                maxAge: 3600,
            })
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
                <form>
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} value={state.email} />
                    <br />
                    <label >Password</label>
                    <input type="password" name="password" onChange={handleChange} value={state.password} />
                    <br />
                    <label >First Name</label>
                    <input type="text" name="firstName" onChange={handleChange} value={state.firstName} />
                    <br />
                    <label >Last Name</label>
                    <input type="text" name="lastName" onChange={handleChange} value={state.lastName} />
                    <br />
                    <label >Contact Number</label>
                    <input type="text" name="contactNo" onChange={handleChange} value={state.contactNo} />
                    <br />
                    <label >House Number</label>
                    <input type="text" name="houseNo" onChange={handleChange} value={state.houseNo} />
                    <br />
                    <label >Street</label>
                    <input type="text" name="street" onChange={handleChange} value={state.street} />
                    <br />
                    <label >City</label>
                    <input type="text" name="city" onChange={handleChange} value={state.city} />
                    <br />
                    <label >State</label>
                    <input type="text" name="state" onChange={handleChange} value={state.state} />
                    <br />
                    <label >ZIP</label>
                    <input type="text" name="zipcode" onChange={handleChange} value={state.zipcode} />
                    <br />
                    {error && <h6>{error}</h6>}
                    <br />
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </form>
            )
    )
}

export default Signup
