import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/Login/Login'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import SellCar from '../pages/admin/Sell Car/Sell'
import Users from '../pages/admin/Users/Users'
import Cars from '../pages/admin/Cars/Cars'
import AddPlace from '../components/admin/AddPlace/AddPlace'
import AddBrand from '../components/admin/Add Brand/AddBrand'
// import Error from '../pages/Error/Error'

const AdminRoute = () => {
  return (
    <Routes>
        <Route exact path='/admin' element={<AdminLogin/>} />
        <Route element={<ProtectedRoute/>} />
        <Route exact path='/admin/dashboard' element={<Dashboard/>} />
        <Route exact path='/admin/users' element={<Users/>} />
        <Route exact path='/admin/addPlace' element={<AddPlace/>} />
        <Route exact path='/admin/addBrand' element={<AddBrand/>} />
        <Route exact path='/admin/cars' element={<Cars/>} />
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