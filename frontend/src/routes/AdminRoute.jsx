import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/Login/Login'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import BookingCar from '../pages/admin/Bookings/Booking'
import SellCar from '../pages/admin/Sell Car/Sell'

const AdminRoute = () => {
  return (
    <Routes>
        <Route exact path='/admin' element={<AdminLogin/>} />
        <Route exact path='/admin/dashboard' element={<Dashboard/>} />
        <Route exact path='/admin/bookings/' element={<BookingCar/>} />
        <Route exact path='/admin/sell-car/' element={<SellCar/>} />
    </Routes>
  )
}

export default AdminRoute
