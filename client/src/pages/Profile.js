import React, { useState, useEffect } from 'react'
import cookie from 'react-cookies'

import { getRentals, getCarsData } from '../helpers/data'

function Profile(props) {

    const user = cookie.load('user')
    const [rentals, setRentals] = useState(() => null)

    useEffect(() => {
        (async () => {
            const rentals = await getRentals(user.email)
            // console.log(rentals)
            const arr = rentals.map(rental => rental.registrationNo)
            // console.log(arr)
            const carData = await getCarsData(arr)
            // console.log(carData)
            var newRentals = []
            for (let rental of rentals) {
                // console.log(rental)
                const data = carData.find(e => e.registrationNo == rental.registrationNo)
                newRentals.push({
                    ...rental,
                    brand: data.brand,
                    model: data.model,

                })
            }
            setRentals(() => newRentals)
        })()
        return () => {
            setRentals(() => null)
        }
    }, [])

    return (
        <div>
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            {user.isAdmin && <a href='/admin'>Admin</a>}
            <sub>{user.email}</sub>
            <p>{`${user.houseNo}, ${user.street}, ${user.city}, ${user.state}, ${user.zipcode}`}</p>

            <h3>Rentals</h3>
            {
                rentals !== null
                    ? (
                        rentals.length > 0
                            ? (
                                <ol>
                                    {
                                        rentals.map(rental => {
                                            // console.log(rental)
                                            return (
                                                <li key={rental.id}>{`
                                                ${rental.brand} ${rental.model} - ${rental.start} to ${rental.end} - ${rental.amount}`}</li>
                                            )
                                        })
                                    }
                                </ol>
                            ) : (
                                <p>No rentals yet!</p>
                            )
                    ) : (
                        <p>Loading...</p>
                    )
            }
        </div>
    )
}

export default Profile
