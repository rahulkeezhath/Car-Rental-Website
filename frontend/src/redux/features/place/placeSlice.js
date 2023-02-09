import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import placeService from './placeService'


const initialState = {
    places: [],
    placeIsLoading: false,
    placeIsSuccess: false,
    placeIsError: false,
    placeMessage:'',
    placeError: ''
}

// Add Place
export const addPlace = createAsyncThunk('places/add', async (place, thunkAPI) => {
    try {
        return await placeService.addPlace(place)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Get Place
export const getPlace = createAsyncThunk('places/get', async (_, thunkAPI) => {
    try {
        return await placeService.getPlace()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Delete Place
export const deletePlace = createAsyncThunk('places/delete', async (id, thunkAPI) => {
    try {
        return await placeService.deletePlace(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const placeSlice = createSlice({
    name:'places',
    initialState,
    reducers: {
        placeReset: (state) => {
            state.placeError = ""
            state.placeIsError = false
            state.placeMessage = ""
            state.placeIsSuccess = false
            state.places = []
        }
    },
     extraReducers: (builder) => {
        builder
            .addCase(addPlace.pending, (state) => {
                state.placeIsLoading = true
            })
            .addCase(addPlace.fulfilled, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.placeMessage = action.payload
            })
            .addCase(addPlace.rejected, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.placeError = action.payload
            })
            .addCase(getPlace.pending, (state) => {
                state.placeIsLoading = true
            })
            .addCase(getPlace.fulfilled, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.places = action.payload
            })
            .addCase(getPlace.rejected, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.placeError = action.payload
            })
            .addCase(deletePlace.pending, (state) => {
                state.placeIsLoading = true
            })
            .addCase(deletePlace.fulfilled, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.placeMessage = action.payload
            })
            .addCase(deletePlace.rejected, (state, action) => {
                state.placeIsLoading = false
                state.placeIsSuccess = true
                state.placeError = action.payload
            })
            
     }
})

export const { placeReset } = placeSlice.actions
export default placeSlice.reducer