import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import adminUsersService from './adminUsersService'

const initialState={
    users:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:'',
}

// Get all users
export const allUsers=createAsyncThunk('adminUsers/users',async(admin,thunkAPI)=>{
    try {
         return await adminUsersService.getUsers(admin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminUsersSlice=createSlice({
    name:'adminUsers',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(allUsers.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(allUsers.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.users=action.payload
        })
        .addCase(allUsers.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})

export const {reset}=adminUsersSlice.actions
export default adminUsersSlice.reducer