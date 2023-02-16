import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/driver/Signup/Signup'
import Login from '../pages/driver/Login/Login'

const DriverRoute = () => {
  return (
    <>
    <Routes>
      <Route path='/driverSignup' element={<Signup/>} />
      <Route path='/driverLogin' element={<Login/>} />
    </Routes>
    </>
  )
}

export default DriverRoute