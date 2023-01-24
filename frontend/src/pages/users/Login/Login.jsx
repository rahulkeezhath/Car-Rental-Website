import React from 'react'
import './Login.css'
import  LG from'../../../assets/Login.jpg'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'




function Login() {

  axios.defaults.baseURL = 'http://localhost:5000';
  
  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false)
  const [data, setData] = useState({
    email:"",
    password:""
  })

  const [error,setError] = useState("")

  const handleChange = ({currentTarget: input}) =>{
    setData({...data,[input.name]: input.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const url = "/users/userLogin";
      const {data:res} = await axios.post(url, data)
      localStorage.setItem("token", res.data)
      setIsUserLoggedIn(true)
      window.location = "/"
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
    <div className='first2'>
       <div class="main">
      <div class="container3">
        <div class="titulo">
          <h1>Welcome To Fastrack</h1>
          <p class="sub">Log in to the Page for Booking Cars</p>
        </div>
        <form id="form" class="form" onSubmit={handleSubmit}>
          <div class="form-control">
            <label for="email">Email</label>
            <input type="email" id="email" name='email' placeholder="Email" onChange={handleChange} value={data.email} required />
            <i id="icon2" onclick="eyeClick()" class=""></i>
            {/* <i class="fa-solid fa-circle-check"></i> */}
            <small>Mensagem de Erro</small>
          </div>

          <div class="form-control">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name='password'
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              required
            />
            <i id="icon" onclick="eyeClick()" class=""></i>
           {/* <i onclick="eyeClick()" class="fa-solid fa-circle-check"></i> */}
            <small>Mensagem de Erro</small>
          </div>
          <div class="lemb-esq">
            <div class="checkbox">
              <input type="checkbox" class="checkbox-box" />
              <p class="Lembrar">Remember My login</p>
            </div>
            <p class="re_senha">Forgot Password</p>
          </div>
          {error && <div className='error_msg'>{error}</div>}<br/>
          <button class="button-entrar" type="submit">Login</button><br />
          <Link to={"/signup"}>
          <button class="button-criar" type="submit">Signup</button>
          </Link>
        </form>
      </div>
      <div class="container4">
        <img src={LG} alt="image" width="100%" height="100%" />
      </div>
    </div>
    <script
      src="https://kit.fontawesome.com/021e83338f.js"
      crossorigin="anonymous"
    ></script>
    </div>
  )
}

export default Login
