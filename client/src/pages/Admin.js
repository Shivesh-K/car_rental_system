import React, { useEffect, useState } from 'react'

import { addCar, deleteCar, getAllCars } from '../helpers/data'
import { validateBrand, validateColor, validateModel, validateRegistrationNo, validateType } from '../helpers/validation'

function Admin() {

    const [cars, setCars] = useState(() => null)
    const [formData, setFormData] = useState(() => ({
        brand: "",
        model: "",
        registrationNo: "",
        type: 0,
        color: ""
    }))

    useEffect(() => {
        (async () => {
            const cars = await getAllCars()
            console.log(cars)
            // const [hatchback, sedan, suv] = [
            //     cars.filter(car => car.type === 1),
            //     cars.filter(car => car.type === 2),
            //     cars.filter(car => car.type === 3),
            // ]
            setCars(() => cars)
        })()
    }, [])

    const handleChange = e => {
        e.persist()
        setFormData(curr => ({
            ...curr,
            [e.target.name]: e.target.value
        }))
        console.log(formData)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (validateBrand(formData.brand)
            && validateModel(formData.model)
            && validateRegistrationNo(formData.registrationNo)
            && validateType(formData.type)
            && validateColor(formData.color)
        ) { }
        else {
            console.log("Invalid credentials")
            return
        }

        const newCar = await addCar(formData)
        console.log(newCar)
        // if (newCar) {
        //     if (newCar.type == '1') {
        //         setCars(old => {
        //             old.hatchback.push(newCar)
        //             console.log(old)
        //             return old
        //         })
        //     }
        //     else if (newCar.type == '2') {
        //         setCars(old => {
        //             old.sedan.push(newCar)
        //             return old
        //         })
        //     }
        //     else if (newCar.type == '3') {
        //         setCars(old => {
        //             old.suv.push(newCar)
        //             return old
        //         })
        //     }
        // }
    }

    const removeCar = async (registrationNo, type) => {
        const isDeleted = await deleteCar(registrationNo)
        // if (isDeleted) {
        //     if (type === 1) {
        //         setCars(old => {
        //             old.hatchback.
        //     })
        //     }
        // }
    }

    return (
        <div>
            <h1>Admin</h1>
            <ol>
                <li>Hatchback</li>
                {
                    cars
                        ? (
                            cars.hatchback.length
                                ? (
                                    <ul>
                                        {cars.hatchback.map(car =>
                                            <li key={car.registrationNo} >
                                                {`${car.brand} ${car.model} - ${car.type}`}
                                                <button onClick={() => removeCar(car.registrationNo, 1)}>Remove</button>
                                            </li>
                                        )}
                                    </ul>
                                ) : (
                                    <p>No hatchbacks avilable right now!</p>
                                )
                        ) : (
                            <p>Loading...</p>
                        )
                }
                <li>Sedan</li>
                {
                    cars
                        ? (
                            cars.sedan.length
                                ? (
                                    <ul>
                                        {cars.sedan.map(car =>
                                            <li key={car.registrationNo} >
                                                {`${car.brand} ${car.model} - ${car.type}`}
                                                <button onClick={() => removeCar(car.registrationNo, 2)}>Remove</button>
                                            </li>
                                        )}
                                    </ul>
                                ) : (
                                    <p>No sedans avilable!</p>
                                )

                        ) : (
                            <p>Loading...</p>
                        )
                }
                <li>SUV</li>
                {
                    cars
                        ? (
                            cars.suv.length
                                ? (
                                    <ul>
                                        {cars.suv.map(car =>
                                            <li key={car.registrationNo} >
                                                {`${car.brand} ${car.model} - ${car.type}`}
                                                <button onClick={() => removeCar(car.registrationNo, 3)}>Remove</button>
                                            </li>
                                        )}
                                    </ul>
                                ) : (
                                    <p>No SUVs avilable right now!</p>
                                )
                        ) : (
                            <p>Loading...</p>
                        )
                }
            </ol>

            <h3>Add a new car</h3>
            <form>
                <label>Brand: </label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} />

                <label>Model: </label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} />

                <label>Registration Number: </label>
                <input type="text" name="registrationNo" value={formData.registrationNo} onChange={handleChange} />

                <label>Type</label>
                <input type="radio" id="hatchback" name="type" value={1} onClick={handleChange} />
                <label htmlFor="hatchback">Male</label><br />
                <input type="radio" id="sedan" name="type" value={2} onClick={handleChange} />
                <label htmlFor="sedan">Female</label><br />
                <input type="radio" id="suv" name="type" value={3} onClick={handleChange} />
                <label htmlFor="suv">Other</label>
                {/* <input type="" /> */}

                <label>Color: </label>
                <input type="text" name="color" value={formData.color} onChange={handleChange} />

                <button type="submit" onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Admin
