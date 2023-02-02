import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/Auth/authSlice'
import adminAuthReducer from '../features/adminAuth/adminAuthSlice'
import adminUsersReducer from '../features/adminUsers/adminUsersSlice'



const store = configureStore({
  reducer:{
    // Users
     auth:authReducer,

     // Admin
     adminAuth:adminAuthReducer,
     adminUsers:adminUsersReducer

  }
})

export default store;