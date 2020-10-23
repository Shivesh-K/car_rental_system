import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                cookie.load('user') ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}
                        />
                    )
            }
        />
    )

export default ProtectedRoute
