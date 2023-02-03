import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carService from './carService'

const initialState = {
    cars:[],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

// Add Car
export const addCar = createAsyncThunk('car/add', async (carData, thunkAPI) => {
    try {
        return await carService.addCar(carData)
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers:(builder) => {
        builder
        .addCase(addCar.pending,(state) => {
            state.isLoading=true
        })
        .addCase(addCar.fulfilled,(state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message = (action.payload)
        })
        .addCase(addCar.rejected,(state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message  = action.payload
        })
    }
})

export const { reset } = carSlice.actions
export default carSlice.reducer