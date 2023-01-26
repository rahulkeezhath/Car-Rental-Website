import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        adminLogin: (state,action) => {
        state.user = action.payload;
        },
        logout: (state,action) =>{
            state.user = null;
        }
    }
})

export const {adminLogin, logout} = adminSlice.actions;

export default adminSlice.reducer