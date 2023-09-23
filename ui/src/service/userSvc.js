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
    return axiosInstance.get('/contacts/all', {
        params: {
            search_value: searchString
        }
    })
}

export const addUserToContact = async (req) => {
    return axiosInstance.post('/contacts', {
        ...req
    })
}


export const sendMessgae = async (message, receiverId) => {
    return axiosInstance.post('/messages/send', {
        message: message,
        receiverId: receiverId
    })
}

export const getMessages = async (user2Id) => {
    return axiosInstance.get('/messages', {
        params: {
            user2Id: user2Id
        }
    })
}