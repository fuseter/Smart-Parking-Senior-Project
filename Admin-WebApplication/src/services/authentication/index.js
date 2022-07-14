import axios from 'axios'
import { config } from '../../constants/config'

const service = axios.create({
    baseURL: `${config.BASEURL}/authentication`,
})

export const createUser = (data) => {
    return service
        .post('/register', data)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const loginService = (data) => {
    return service
        .post('/login', data)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const getallUser = () => {
    return service
        .get('/allUser')
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const deleteUser = (uid) => {
    return service
        .delete(`/deleteUser/${uid}`)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const allAmountUser = () => {
    return service
        .get('/AllAmountUser')
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const getOneUser = (uid) => {
    return service
        .get(`/getOneUser/${uid}`)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}
export const updateUserProfile = (data) => {
    return service
        .post('/editUserProfile', data)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}
