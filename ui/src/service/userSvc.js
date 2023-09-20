import { axiosInstance } from './autheticateReq'

export const loginUser = async (mobileNumber, password) => {
    return axiosInstance.post(`/login`, {
        mobile_number: mobileNumber,
        password: password
    })
}

export const registerUser = async (req) => {
    return axiosInstance.post(`/register`, {
        ...req
    })
}

export const getContactList = async () => {
    return axiosInstance.get('/users')
}

export const userContacts = async (searchString) => {
    return axiosInstance.get('contacts/all', {
        params: {
            search_value: searchString
        }
    })
}

export const addUserToContact = async (req) => {
    return axiosInstance.post('contacts', {
        ...req
    })
}
