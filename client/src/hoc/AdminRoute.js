import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

const AdminRoute = ({
    component: Component,
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                cookie.load('user') && cookie.load('user').isAdmin ? (
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

export default AdminRoute
