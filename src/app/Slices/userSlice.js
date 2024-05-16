import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        decoded: {
            firstName: "",
            email: "",
            id: "",
        },
    },

    reducers: {

        login: (state, action) => {
            return{
                ...state,
                ...action.payload,
            }
        },

        logout: (state, action) => {
            return {
                token: "",
                decoded: {
                    firstName: "",
                    email: "",
                    id: "",
                },
                
            }
        },

        update: (state, action) => {
            return{
                ...state,
                ...action.payload,
            }
        },
    }
})

export const {login,logout,update} = userSlice.actions

export const getUserData = (state) => state.user

export default userSlice.reducer