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
    const res = await axios.get(`${API_URL}/groups/group/${id}`, config)
    return res.data
}

//Delete group by id
export const deleteGroupById = async(token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${API_URL}/groups/group/${id}`, config)
    return res
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

//Get tasks from groupId

export const bringTasksFromGroup = async(token,groupId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(`${API_URL}/groups/${groupId}/tasks`, config)
    
    return res.data
}

// Create task
export const createTask = async(token,groupId,data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(`${API_URL}/groups/${groupId}/tasks`,data, config)
}

// Get task by id
export const bringTaskById = async(token,group, task) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/groups/${group}/tasks/${task}`, config)
    return res.data
    
}

//Update task by id
export const updateTaskById = async(token,group,taskData, task) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    //obj about taskData to can update it
    const data = {
        description: taskData.description,
        spentHours: taskData.spentHours,
        endDate: taskData.endDate,
        stateId: taskData.stateId
    }
    const res = await axios.put(`${API_URL}/groups/${group}/tasks/${task}`,data, config)
    return res
}

// Delete task by id
export const deleteTaskById = async(token,group, task) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${API_URL}/groups/${group}/tasks/${task}`, config)
    return res 
}

// Get All Users as admin
export const getAllUsers = async(token,page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/users/allUsers?page=${page}`, config)
    return res.data
}

// Get All Groups as admin
export const getAllGroups = async(token,page) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}/groups/allGroups?page=${page}`, config)
    return res.data
}