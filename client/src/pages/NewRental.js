import React, { useEffect, useState } from 'react'
import cookie from 'react-cookies'

import { getAllCars, addRental, getRentalRates } from '../helpers/data'

function NewRental() {

    const [cars, setCars] = useState(() => ({}))
    const [items, setItems] = useState(() => ([]))
    const [data, setData] = useState(() => ({
        registrationNo: "",
        start: "",
        end: "",
        amount: 0
    }))
    const [rentalRates, setRentalRates] = useState(0)
    const [type, setType] = useState(0)

    useEffect(() => {
        (async () => {
            const cars = await getAllCars()

            const rentalRates = await getRentalRates()

            for (let key of Object.keys(cars)) {
                console.log(key)
                const value = cars[key]
                value.forEach(element => {
                    items.push(
                        <div key={element.registrationNo}>
                            <input type="radio" name="registrationNo" value={element.registrationNo} onClick={e => {
                                handleChange(e)
                                setType(element.type)
                            }} />
                            <label>
                                {`${element.registrationNo} - ${element.brand} ${element.model} - ${element.type}`}
                            </label>
                        </div>
                    )
                })
            }

            setCars(() => cars)
            setItems(() => items)
            setRentalRates(() => rentalRates)
        })()
    }, [])

    useEffect(() => {
        var d1 = new Date(data.start)
        var d2 = new Date(data.end)
        var dt = d2.getTime() - d1.getTime()
        var dd = dt / (1000 * 3600 * 24) + 1;
        let rate = 0
        if (rentalRates && rentalRates.find(el => el.id === type)) {
            rate = rentalRates.find(el => el.id === type).pricePerDay
        }

        var total = (cars)
            ? dd * rate
            : 0
        if (!total) total = 0
        console.log(total)
        setData(curr => ({
            ...curr,
            amount: total
        }))

    }, [data.registrationNo, data.start, data.end])

    const handleChange = e => {
        e.persist()
        setData(curr => ({
            ...curr,
            [e.target.name]: e.target.value
        }))
        // console.log(data)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const response = await addRental({ ...data, email: cookie.load('user').email })
        console.log("New rental added")
        // console.log(data)
    }

    return (
        <div>
            <h1>New Rental</h1>

            <form>

                <label>Select a car</label>
                {items.length !== 0 ? items : <p>Loading...</p>}

                <label>Start Date</label>
                <input name="start" type="date" value={data.start} onChange={handleChange} />

                <label>End Date</label>
                <input name="end" type="date" value={data.end} onChange={handleChange} />

                <p>{data.amount}</p>
                <button type="submit" onClick={handleSubmit}>Book</button>
            </form>
        </div>
    )
}

export default NewRental
