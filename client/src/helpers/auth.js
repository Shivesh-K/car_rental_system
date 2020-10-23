import API from '../services/axios'

const login = async ({ email, password }) => {
    const response = await API.get(`/user/${email}`)
    if (response.status === 200 && response.data.password === password) {
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
        return {
            isSignedUp: true,
            user: response.data
        }
    }
    else {
        return { isSignedUp: false }
    }
}

export { login, signup }