import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from './bookingService'

const initialState = {
    bookings: [],
    bookingIsLoading: false,
    bookingIsSuccess: false,
    bookingIsError: false,
    bookingMessage: '',
    bookingError: '',
}

// Book a Car
export const bookCar = createAsyncThunk('booking/bookCar', async (bookingData, thunkAPI) => {
    try {
        return await bookingService.bookCar(bookingData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        bookingReset: (state) => {
            state.bookings = []
            state.bookingIsLoading = false
            state.bookingIsSuccess = false
            state.bookingIsError = false
            state.bookingError = ''
            state.bookingMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(bookCar.pending, (state) => {
            state.bookingIsLoading = true
        })
        .addCase(bookCar.fulfilled, (state, action) => {
            state.bookingIsLoading = false
            state.bookingIsSuccess = true
            state.bookingMessage = action.payload   
        })
        .addCase(bookCar.rejected, (state,action) => {
            state.bookingIsLoading = false
            state.bookingIsError = true
            state.bookingError = action.payload
        })
    }
})


export const { bookingReset } = bookingSlice.actions
export default bookingSlice.reducer