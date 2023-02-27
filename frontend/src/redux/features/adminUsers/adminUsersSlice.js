import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import adminUsersService from './adminUsersService'

const initialState={
    users:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:'',
    error: ''
}

// Get all users
export const allUsers=createAsyncThunk('adminUsers/users',async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().adminAuth.admin.data
         return await adminUsersService.getUsers(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Block and Unblock Users
export const blockAndUnblock = createAsyncThunk('adminUsers/blockAndUnblock', async(id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.data
        return await adminUsersService.blockAndUnblockUser(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminUsersSlice=createSlice({
    name:'adminUsers',
    initialState,
    reducers:{
        reset:(state)=> {
            state.users = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.error = ''
        }
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
        .addCase(blockAndUnblock.pending,(state) => {
            state.isLoading = true
        })
        .addCase(blockAndUnblock.fulfilled,(state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(blockAndUnblock.rejected,(state,action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.payload
        })
    }
})

export const {reset}=adminUsersSlice.actions
export default adminUsersSlice.reducer