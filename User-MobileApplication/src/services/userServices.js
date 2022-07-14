import axios from 'axios'

import { configs } from '../constants/config'

export const UserSignIn = data => {
    return axios
        .post(`${configs.BASEURL}/authentication/login`, data, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

export const UserSignUp = data => {
    return axios
        .post(`${configs.BASEURL}/authentication/register`, data, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

export const UserProfile = _id => {
    return axios
        .get(`${configs.BASEURL}/authentication/userProfile/${_id}`, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

export const UserUpdateProfile = data => {
    return axios
        .post(`${configs.BASEURL}/authentication/updateProfile`, data, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}

export const UserChangePassword = data => {
    return axios
        .post(`${configs.BASEURL}/authentication/changePassword`, data, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response)
        .catch(error => {
            throw error
        })
}
