import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/Login/Login'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import BookingCar from '../pages/admin/Bookings/Booking'
import SellCar from '../pages/admin/Sell Car/Sell'
// import Error from '../pages/Error/Error'

const AdminRoute = () => {
  return (
    <Routes>
        <Route exact path='/admin' element={<AdminLogin/>} />
        <Route element={<ProtectedRoute/>} />
        <Route exact path='/admin/dashboard' element={<Dashboard/>} />
        <Route exact path='/admin/bookings/' element={<BookingCar/>} />
        <Route exact path='/admin/sell-car/' element={<SellCar/>} />
        {/* <Route exact path='*' element={<Error/>} /> */}
    </Routes>
  )
}

export default AdminRoute


function ProtectedRoute() {
  let auth = localStorage.getItem('admin')
  if(!auth) {
    return <Navigate to={'/admin'} replace />
  }
  return <Outlet/>
}