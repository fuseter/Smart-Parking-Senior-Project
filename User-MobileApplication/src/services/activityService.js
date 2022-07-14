import axios from 'axios'
import { configs } from '../constants/config'

export const fetchAllActivity = data => {
    return axios
        .post(`${configs.BASEURL}/activity/allActivity`, data, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

export const fetchParking = uid => {
    return axios
        .get(`${configs.BASEURL}/activity/ParkingActivity/${uid}`, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}
