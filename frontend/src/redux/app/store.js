import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/Auth/authSlice'
import adminAuthReducer from '../features/adminAuth/adminAuthSlice'
import adminUsersReducer from '../features/adminUsers/adminUsersSlice'
import updateUserReducer from '../features/auth/userUpdatedSlice'



const store = configureStore({
  reducer:{
    // Users
     auth:authReducer,
     updatedUser:updateUserReducer,

     // Admin
     adminAuth:adminAuthReducer,
     adminUsers:adminUsersReducer

  }
})

export default store;