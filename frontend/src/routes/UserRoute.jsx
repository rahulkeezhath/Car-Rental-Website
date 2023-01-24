import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signup from '../pages/users/Signup/Signup'
import Login from '../pages/users/Login/Login'
import Home from '../pages/users/Home/Home'
import Bookings from '../pages/users/MyBookings/Bookings'
import Cars from '../pages/users/Cars/Cars'
import SingleCar from '../pages/users/Single Car/Single'
import About from '../pages/users/About/About'
import Blog from '../pages/users/Blog/Blog'
import BlogDetails from '../pages/users/Blog/BlogDetails'
import Contact from '../pages/users/Contact/Contact'


const UserRoute = ()=>{
  return (
    <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/bookingcar' element={<Bookings/>} />
        <Route exact path='/cars' element={<Cars/>} />
        <Route exact path='/cars/:slug' element={<SingleCar/>} />
        <Route exact path='/about' element={<About/>} /> 
        <Route exact path='/blog' element={<Blog/>} />
        <Route exact path='/blog/:slug' element={<BlogDetails/>} />
        <Route exact path='/contact' element={<Contact/>} />

    </Routes>
  )
}

export default UserRoute
