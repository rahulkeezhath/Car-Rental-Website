import React from 'react'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {adminLogin} from '../../../redux/features/adminAuth/adminAuthSlice'


const Login = () => {

    axios.defaults.baseURL = 'http://localhost:5000'

    const [isAdminLoggedIn,setIsAdminLoggedIn] =useState(false)
    const [data, setData] = useState({
        userName:"",
        password:""
    })

    const dispatch = useDispatch()

    const [error,setError] = useState("")

    const handleChange = ({currentTarget:input}) => {
        setData({...data,[input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(adminLogin({
          userName:data.userName,
          password:data.password,
          loggedIn:true
        }))
        try {
            const url = "/admin/adminLogin";
            const {data:res} = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            setIsAdminLoggedIn(true)
            window.location = "/admin/dashboard"
          } catch (error) {
            if(
              error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500
            ) {
              setError(error.response.data.message)
            }
          }
    }

  return (
   
<div class="mainLogin">
        <div class="container">
            <div class="login">
                <div class="row lgn">
                    <div class="col-md img">    
                    </div>
                    <div class="col-md">
                        <form class="login-form" onSubmit={handleSubmit}>
                            <h4>Admin Login</h4>
                            <div class="form-group">
                                <input class="form-control user" name="userName" type="text" autocomplete="off" placeholder="User Name"  onChange={handleChange} value={data.userName} required/>
                                <i class="fa ic fa-envelope" aria-hidden="true"></i>
                            </div>
                            <div class="form-group">
                                <input class="form-control pass" type="password" name="password" placeholder="Password" autocomplete="new-password" onChange={handleChange} value={data.password} required/>
                                <i class="fa ic fa-lock" aria-hidden="true"></i>
                            </div>
                            {error && <div className='error_msg'>{error}</div>}<br/>
                            <button class="btn-login" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
