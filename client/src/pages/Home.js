import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import { Typography, Button, Container } from '@material-ui/core'
import { DirectionsCarRounded, PersonRounded, SettingsRounded, ArrowForwardRounded } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import CustomAppBar from '../components/AppBar'

const useStyles = makeStyles({

    appbar: {
        position: "static",
        backgroundColor: "transparent",
        color: "black",
        boxShadow: "none"
    },

    title: {
        flexGrow: 1
    },

    main: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },

    heading: {
        marginBottom: "1.5em"
    },

    bookRideCard: {
        margin: 16,
        padding: 16,
        fontSize: "4rem"
    },
    bookRideText: {
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
    },

    flexRow: {
        display: "flex",
        justifyContent: "center"
    },

    icon: {
        fontSize: "2rem",
        marginRight: 8
    },

    padded: {
        padding: 16
    },

    circleBorder: {
        borderRadius: 8
    },

    paperLink: {
        margin: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }

})


function Home(props) {

    const classes = useStyles()

    const user = cookie.load('user')
    const [redirect, setRedirect] = useState(() => "")

    return (
        redirect !== "" ?
            (
                <Redirect to={{
                    pathname: redirect,
                    state: {
                        from: props.pathname,
                    }
                }} />
            ) : (
                <Fragment>

                    <CustomAppBar />

                    <Container className={classes.main}>

                        <Typography variant="h3" className={classes.heading}>
                            {`Welcome, ${user.firstName}`}
                        </Typography>

                        <Button
                            variant="contained"
                            className={`${classes.bookRideCard} ${classes.circleBorder}`}
                            startIcon={<DirectionsCarRounded style={{ fontSize: "2rem" }} />}
                            endIcon={<ArrowForwardRounded style={{ fontSize: "2rem", marginLeft: 16 }} />}
                            onClick={() => setRedirect(() => '/rental/new')}
                        >
                            <Typography className={classes.bookRideText}>
                                Book your ride
                            </Typography>
                        </Button>

                        <Container className={classes.flexRow} >
                            <Button
                                onClick={() => setRedirect(() => '/profile')}
                                variant="outlined"
                                className={`${classes.padded} ${classes.circleBorder} ${classes.paperLink}`}
                            >
                                <PersonRounded className={classes.icon} />
                                <Typography>Profile</Typography>
                            </Button>
                            {
                                user.isAdmin &&
                                <Button
                                    onClick={() => setRedirect(() => '/admin')}
                                    variant="outlined"
                                    className={`${classes.padded} ${classes.circleBorder} ${classes.paperLink}`}
                                >
                                    <SettingsRounded className={classes.icon} />
                                    <Typography>Admin</Typography>
                                </Button>
                            }
                        </Container>
                    </Container>

                </Fragment>
            )

    )
}

export default Home
