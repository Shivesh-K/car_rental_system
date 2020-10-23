import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import { login } from '../helpers/auth'
import { validateEmail, validatePassword } from '../helpers/validation'

export default function Login(props) {

    const [state, setState] = useState(() => ({
        email: "",
        password: "",
    }))
    const [error, setError] = useState(() => "")
    const [redirect, setRedirect] = useState("")
    // const [user, setUser] = useState(() => null)

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

        const { isLoggedIn, user } = await login({
            email: state.email,
            password: state.password
        })

        if (isLoggedIn) {
            console.log(props)
            const redirect = props.location.state ? props.location.state.from.pathname : '/home'
            // setUser(() => user)
            cookie.save('user', user, {
                path: '/',
                maxAge: 3600,
            })
            setRedirect(() => redirect)
        }
    }

    return (
        redirect !== "" ?
            (<Redirect to={{
                pathname: redirect,
                state: {
                    from: props.location,
                    // user: user
                }
            }} />) :
            (<form>
                <label>Email</label>
                <textarea name="email" onChange={e => handleChange(e)} value={state.email} />
                <br />
                <label >Password</label>
                <textarea name="password" onChange={e => handleChange(e)} value={state.password} />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>)
    )
}
