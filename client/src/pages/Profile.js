import React, { useState, useEffect, Fragment } from 'react'
import cookie from 'react-cookies'
import { Typography, Container, Paper, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@material-ui/core'
import { Edit, SentimentVeryDissatisfiedRounded } from '@material-ui/icons'

import CustomAppBar from '../components/AppBar'
import { getRentals, getCarsData } from '../helpers/data'
import { Redirect } from 'react-router-dom'

function Profile(props) {

    const user = cookie.load('user')
    const [rentals, setRentals] = useState(() => null)
    const [redirect, setRedirect] = useState('')

    useEffect(() => {
        (async () => {
            const rentals = (await getRentals(user.email)).filter(rental => rental.registrationNo !== null)
            const arr = rentals.map(rental => rental.registrationNo)
            console.log(arr)
            const carData = await getCarsData(arr)
            console.log(carData)
            var newRentals = []
            for (let rental of rentals) {
                // console.log(rental)
                if (carData && rental) {
                    const data = carData.find(e => e.registrationNo == rental.registrationNo)
                    newRentals.push({
                        ...rental,
                        brand: data.brand,
                        model: data.model,
                        registrationNo: data.registrationNo
                    })
                }

            }
            setRentals(() => newRentals)
        })()
        return () => {
            setRentals(() => null)
        }
    }, [])

    return (
        redirect !== "" ? (
            <Redirect to={{
                pathname: redirect,
                state: {
                    from: props.location
                }
            }}
            />
        ) : (
                <Fragment>
                    <CustomAppBar goHome={() => setRedirect('/home')} />
                    <Container style={{ minHeight: "100vh", display: "contents", position: "fixed" }}>

                        <Typography
                            variant="h3"
                            style={{
                                marginTop: "2em"
                            }}
                        >
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                        <Typography variant="body1">{`${user.email}  •  ${user.contactNo}`}</Typography>

                        {user.isAdmin && <Button onClick={() => setRedirect('/admin')}>Admin</Button>}
                        <Button
                            startIcon={<Edit />}
                            onClick={() => setRedirect('/profile/edit')}
                            style={{ marginLeft: 8 }}
                        >
                            Edit
                        </Button>

                        <Typography variant="body2" style={{ marginTop: 16 }}>
                            {`${user.houseNo}, ${user.street}, ${user.city}, ${user.state}, ${user.zipcode}`}
                        </Typography>

                        <Typography variant="h5" style={{ marginTop: 16 }}>Rentals</Typography>
                        {
                            rentals !== null
                                ? (
                                    rentals.length > 0
                                        ? (
                                            <TableContainer component={Paper}>
                                                <Table stickyHeader >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                                                            <TableCell style={{ fontWeight: "bold" }}>Registration No.</TableCell>
                                                            <TableCell style={{ fontWeight: "bold" }}>Start Date</TableCell>
                                                            <TableCell style={{ fontWeight: "bold" }}>End Date</TableCell>
                                                            <TableCell style={{ fontWeight: "bold" }}>Total Amount (Rs.)</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        {
                                                            rentals.map(rental => {
                                                                // console.log(rental)
                                                                return (
                                                                    <TableRow key={rental.id}>
                                                                        <TableCell>{`${rental.brand} ${rental.model}`}</TableCell>
                                                                        <TableCell>{rental.registrationNo}</TableCell>
                                                                        <TableCell>{rental.start.substring(0, 10)}</TableCell>
                                                                        <TableCell>{rental.end.substring(0, 10)}</TableCell>
                                                                        <TableCell align="center">{rental.amount}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        ) : (
                                            <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <SentimentVeryDissatisfiedRounded />
                                                <Typography variant="body1">No rentals yet!</Typography>
                                            </Container>
                                        )
                                ) : (
                                    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <CircularProgress />
                                    </Container>
                                )
                        }
                    </Container>
                </Fragment>
            )
    )
}

export default Profile
