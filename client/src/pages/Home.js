import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

function Home(props) {
    console.log(props)

    const user = cookie.load('user')
    const [redirect, setRedirect] = useState(() => "")

    return (
        redirect !== "" ?
            (
                <Redirect to={{
                    pathname: redirect,
                    state: {
                        from: props.pathname,
                        // user: user
                    }
                }} />
            ) : (
                <div>
                    <h1>{`Welcome, ${user.firstName}`}</h1>
                    <div onClick={() => setRedirect(() => '/rental/new')} >Book a ride</div>
                    <div onClick={() => setRedirect(() => '/profile')} >Go to profile</div>
                    {user.isAdmin && <div onClick={() => setRedirect(() => '/admin')} >Admin control</div>}
                </div>
            )

    )
}

export default Home
