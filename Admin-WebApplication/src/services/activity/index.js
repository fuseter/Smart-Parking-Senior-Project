import axios from 'axios'
import { config } from '../../constants/config'

const service = axios.create({
    baseURL: `${config.BASEURL}/activity`,
})

export const allActivity = () => {
    return service
        .get('/adminAllActivity')
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}

export const allAmountActivity = () => {
    return service
        .get('/AllAmountActivity')
        .then((response) => response)
        .catch((error) => {
            throw error
        })
}
