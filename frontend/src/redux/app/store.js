import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/Auth/authSlice'
import adminAuthReducer from '../features/adminAuth/adminAuthSlice'



const store = configureStore({
  reducer:{
    // Users
     auth:authReducer,

     // Admin
     adminAuth:adminAuthReducer
  }
})

export default store;