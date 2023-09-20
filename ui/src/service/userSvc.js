import { axiosInstance } from './autheticateReq'

export const loginUser = async (mobileNumber, password) => {
    return axiosInstance.post(`/users/login`, {
        mobile_number: mobileNumber,
        password: password
    })
}

export const registerUser = async (req) => {
    return axiosInstance.post(`/users/register`, {
        ...req
    })
}

export const getContactList = async (userId) => {
    return axiosInstance.get('/users', {
        params: {
            user_id: userId
        }
    })
}

export const userContacts = async (userId) => {
    return axiosInstance.get('contacts/all', {
        params: {
            user_id: userId
        }
    })
}

export const addUserToContact = async (req) => {
    console.log("req :", req);
    return axiosInstance.post('contacts', {
        ...req
    })
}