import React from 'react'
import { Routes, Route, Navigate, Outlet} from 'react-router-dom'
import UserSignup from '../pages/users/Signup/Signup'
import UserLogin from '../pages/users/Login/Login'
import Otp from '../pages/users/OtpVerification/OTP'
import Home from '../pages/users/Home/Home'
import Profile from '../pages/users/Profile/Profile'
import Cars from '../pages/users/Cars/Cars'
import SingleCar from '../pages/users/SingleCar/Single'
import About from '../pages/users/About/About'
import Blog from '../pages/users/Blog/Blog'
import Contact from '../pages/users/Contact/Contact'
// import Error from '../pages/Error/Error'


const UserRoute = ()=>{
  return (
    <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/signup' element={<UserSignup/>} />
        <Route exact path='/login' element={<UserLogin/>} />
        <Route element={<ProtectedRoute/>} />
        <Route exact path='/otp' element={<Otp/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route exact path='/cars' element={<Cars/>} />
        <Route exact path='/car' element={<SingleCar/>} />
        <Route exact path='/about' element={<About/>} /> 
        <Route exact path='/blog' element={<Blog/>} />
        <Route exact path='/contact' element={<Contact/>} />
        {/* <Route exact path='*' element={<Error/>} /> */}
    </Routes>
  )
}

export default UserRoute

export function ProtectedRoute() {
  let auth = localStorage.getItem('user')
  if(!auth) {
    return <Navigate to={'/login'} replace />
  }
  return <Outlet />
}
