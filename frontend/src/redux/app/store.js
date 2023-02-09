import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../features/Auth/authSlice'
import adminAuthReducer from '../features/adminAuth/adminAuthSlice'
import adminUsersReducer from '../features/adminUsers/adminUsersSlice'
import updateUserReducer from '../features/auth/userUpdatedSlice'
import placesReducer from '../features/place/placeSlice'
import brandsReducer from '../features/brands/brandSlice'
import adminCarReducer from '../features/cars/carSlice'



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

const adminPlacePersistConfig = {
  key: 'places',
  storage
}

const adminBrandPersistConfig = {
  key: 'brands',
  storage
}

const adminCarPersistConfig = {
  key: 'car',
  storage
}


const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedUpdatedUserReducer = persistReducer(updatedUserPersistConfig, updateUserReducer)
const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, adminAuthReducer)
const persistedAdminUsersReducer = persistReducer(adminUsersPersistConfig, adminUsersReducer)
const persistedAdminPlacesReducer = persistReducer(adminPlacePersistConfig, placesReducer)
const persistedAdminBrandReducer =  persistReducer(adminBrandPersistConfig, brandsReducer)
const persistedAdminCarReducer = persistReducer(adminCarPersistConfig,adminCarReducer)

const store = configureStore({
  reducer:{
    // Users
    auth:persistedAuthReducer,
    updatedUser:persistedUpdatedUserReducer,
    
    // Admin
    adminAuth:persistedAdminAuthReducer,
    adminUsers:persistedAdminUsersReducer,
    places:persistedAdminPlacesReducer,
    brands: persistedAdminBrandReducer,
    car:persistedAdminCarReducer   
  }
})


export default store;