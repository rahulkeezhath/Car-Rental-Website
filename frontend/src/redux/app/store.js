import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../features/Auth/authSlice'
import adminAuthReducer from '../features/adminAuth/adminAuthSlice'
import adminUsersReducer from '../features/adminUsers/adminUsersSlice'
import updateUserReducer from '../features/auth/userUpdatedSlice'



const authPersistConfig = {
  key: 'auth',
  storage,
}

const updatedUserPersistConfig = {
  key: 'updatedUser',
  storage,
}

const adminAuthPersistConfig = {
  key: 'adminAuth',
  storage,
}

const adminUsersPersistConfig = {
  key: 'adminUsers',
  storage,
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedUpdatedUserReducer = persistReducer(updatedUserPersistConfig, updateUserReducer)
const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, adminAuthReducer)
const persistedAdminUsersReducer = persistReducer(adminUsersPersistConfig, adminUsersReducer)

const store = configureStore({
  reducer:{
    // Users
    auth:persistedAuthReducer,
    updatedUser:persistedUpdatedUserReducer,
    
    // Admin
    adminAuth:persistedAdminAuthReducer,
    adminUsers:persistedAdminUsersReducer
    
  }
})


export default store;