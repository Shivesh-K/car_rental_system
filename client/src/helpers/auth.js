import cookie from 'react-cookies'

import API from '../services/axios'

const login = async ({ email, password }) => {
    const response = await API.get(`/user/${email}`)
    // console.log(response.data)
    if (response.status === 200 && response.data.password === password) {
        cookie.save('user', response.data, {
            maxAge: 3600,
        })
        return {
            isLoggedIn: true,
            user: response.data
        }
    }
    else {
        return { isLoggedIn: false }
    }
}

const signup = async (data) => {
    const response = await API.post('/user/add', data)
    if (response.status === 200) {
        cookie.save('user', response.data, {
            maxAge: 3600,
        })
        return {
            isSignedUp: true
        }
    }
    else {
        return { isSignedUp: false }
    }
}

const logout = () => {
    try {
        cookie.remove('user')
        return true
    }
    catch (err) {
        console.error(err)
        return false
    }
}

export { login, signup, logout }