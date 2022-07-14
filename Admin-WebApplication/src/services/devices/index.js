import axios from 'axios'
import { config } from '../../constants/config'

const service = axios.create({
    baseURL: `${config.BASEURL}/device`,
})

export const getallDevice = () => {
    return service
        .get('/allDevice')
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const registerDevice = (data) => {
    return service
        .post('/register-device', data)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const deleteDevice = (deviceID) => {
    return service
        .delete(`/deleteDevice/${deviceID}`)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const updateDevice = (data) => {
    return service
        .post('/updateDevice', data)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const allAmountDevice = () => {
    return service
        .get('/AllAmountDevice')
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const getOneDevice = (deviceID) => {
    return service
        .get(`/getOneDevice/${deviceID}`)
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}
