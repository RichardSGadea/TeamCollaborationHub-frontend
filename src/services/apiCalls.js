import axios from "axios";

const API_URL = "http://localhost:4000/api";

// Authentication calls

export const loginCall = async (credentials) => {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);
    return res
};
export const registerCall = async (credentials) => {
    const res = await axios.post(`${API_URL}/auth/register`, credentials);
    return res
}

// Get and update user profile calls

export const bringProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/users/profile`, config)
    
    return res.data
}

export const updateProfile = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${API_URL}/users/profile`, data, config)
    return res
}

//Create group
export const createNewGroup = async(token, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${API_URL}/groups/create`,data,config)
    return res
}

//Update group
export const updateGroupById = async(token,groupId, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${API_URL}/groups/${groupId}`,data,config)
    return res
}

// Get groups 
export const bringGroups = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/groups/`, config)
    return res.data.groups
}

//Get group by id
export const bringGroupById = async(token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/groups/${id}`, config)
    return res.data
}

//Get users from group
export const bringUsersFromGroup = async(token,id,page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/groups/${id}/users/?page=${page}`, config)
    return res.data
}

//Get users out of group by id

export const bringOutUsers = async(token,id,page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/groups/${id}/outUsers/?page=${page}`, config)
    return res.data
}

//Add user from group

export const addUserGroup = async (token,groupId,data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const userToAdd = {
        userId: data
    }
    const res = await axios.post(`${API_URL}/groups/${groupId}/users`,userToAdd, config)
    return res
}

//Delete user from group

export const deleteUserGroup = async (token,groupId,data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data:{
            userId: data
        }
    }
    
    const res = await axios.delete(`${API_URL}/groups/${groupId}/users`, config)
    return res
}

