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

export const userContacts = async (userId, searchString) => {
    return axiosInstance.get('/contacts/all', {
        params: {
            userId: userId,
            search_value: searchString
        }
    })
}

export const getUserContactByUserId = async (userId) => {
    return axiosInstance.get('/contacts/user', {
        params: {
            userId: userId
        }
    })
}

export const addUserToContact = async (req) => {
    return axiosInstance.post('/contacts', {
        ...req
    })
}


export const sendMessage = async (message, receiverId, fileID) => {
    return axiosInstance.post('/messages/send', {
        message: message,
        receiverId: receiverId,
        fileId: fileID
    })
}

export const getMessages = async (user2Id) => {
    return axiosInstance.get('/messages', {
        params: {
            user2Id: user2Id
        }
    })
}

export const logout = async (userId) => {
    return axiosInstance.put(`/logout`, {
        userId: userId,
    })
}

export const getUserById = async (userId) => {
    return axiosInstance.get(`/users/user?id=${userId}`)
}

export const getMessageRequest = async () => {
    return axiosInstance.get('/messages/request')
}

export const createGroup = async (name, memberId) => {
    return axiosInstance.post('/groups', {
        name: name,
        members: memberId
    })
}

export const getGroups = async () => {
    return axiosInstance.get('/groups')
}

export const getGroupMessage = async (groupId) => {
    return axiosInstance.get('/messages/groupMessages', {
        params: {
            groupId: groupId
        }
    })
}

export const sendGroupMessage = async (groupId, message) => {
    return axiosInstance.post("/messages/groupMessages/send", {
        groupId: groupId,
        message: message,
    })
}

export const updateUser = async (user) => {
    return axiosInstance.put("/users/", {
        user: user
    })
}

export const updateMsgStatus = async (contactUserID) => {
    return axiosInstance.put("/messages/status", {
        contactUserID: contactUserID
    })
}

export const uploadAttachment = async (data) => {
    return axiosInstance.post("/upload", data)
}

export const uploadImage = async (data) => {
    return axiosInstance.post("/upload-image", data)
}
