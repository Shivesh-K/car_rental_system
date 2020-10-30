import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { logout } from '../helpers/auth'

const useStyles = makeStyles({
    appbar: {
        position: "fixed",
        backgroundColor: "transparent",
        color: "black",
        boxShadow: "none"
    },

    title: {
        flexGrow: 1
    },
})

function CustomAppBar({ goHome }) {

    const classes = useStyles()

    return (
        <AppBar className={classes.appbar} >
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Button onClick={goHome}>
                        Bookr.
                    </Button>
                </Typography>
                <Button color="inherit" onClick={() => {
                    logout()
                    window.location.reload()
                }}>
                    Logout
                    </Button>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar
