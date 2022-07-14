import axios from 'axios'
import { configs } from '../constants/config'

export const fetchAllDevice = () => {
    return axios
        .get(`${configs.BASEURL}/device/allDevice`, {
            headers: {
                'Content-Type': 'application/json',
                // authorization: `Bearer ${Token}`,
            },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

export const parkingActive = data => {
    return axios
        .post(`${configs.BASEURL}/iot/parking/active`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}
