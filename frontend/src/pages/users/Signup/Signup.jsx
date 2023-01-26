import React from 'react'
import './Signup.css'
import SP from '../../../assets/Signup.jpeg'
import { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'



function Signup() {

  
   axios.defaults.baseURL = 'http://localhost:5000';

  const [data,setData] = useState({
    fullName:"",
    email: "",
    phoneNumber: "",
    password: ""
  })


  const [error, setError] = useState("")
  const navigate = useNavigate()  

  const handleChange = ({currentTarget: input}) => {
    setData({...data,[input.name]:input.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/users/userSignup";
      const {data:res} = await axios.post(url, data)
      navigate('/login')
      console.log(res.message);
    } catch (error) {
      if(error.response && 
        error.response.status >= 400 &&
        error.response.status <= 500
        ){
          setError(error.response.data.message)
        }
    }
  }

  return (
   <div className='first1'>
    <div className="main mb-5 mt-5">
   <div className="container1">
     <div className="titulo">
       <h1>Welcome To Fastrack</h1>
       <p className="sub">Signup in the Page for Accessing Cars</p>
     </div>
     <form id="form" class="form" onSubmit={handleSubmit}>
       <div className="form-control">
         <label for="email">Full Name</label>
         <input type="text" id="fName" name='fullName' placeholder="Full Name" onChange={handleChange} value={data.fullName} required />
         <i id="icon2" onclick="eyeClick()" className=""></i>
         {/* <i class="fa-solid fa-circle-check"></i> */}
       </div>

       <div className="form-control">
         <label for="email">Email</label>
         <input type="email" id="email" name='email'  placeholder="Email" onChange={handleChange} value={data.email} required />
         <i id="icon2" onclick="eyeClick()" className=""></i>
         {/* <i class="fa-solid fa-circle-check"></i> */}
       </div>

       <div className="form-control">
         <label for="email">Phone Number</label>
         <input type="text" id="phoneNumber" name='phoneNumber' placeholder="Phone Number" onChange={handleChange} value={data.phoneNumber} required />
         <i id="icon2" onclick="eyeClick()" className=""></i>
         {/* <i class="fa-solid fa-circle-check"></i> */}
       </div>

       <div className="form-control">
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
         <i id="icon" onclick="eyeClick()" className=""></i>
        {/* <i onclick="eyeClick()" class="fa-solid fa-circle-check"></i> */}
       </div>    
       {error && <div className='error_msg'>{error}</div>}<br/>
       <button class="button-entrar" type="submit">Signup</button><br />
       <Link to={"/login"}>
       <button class="button-criar" type="submit">Login</button>
       </Link>
     </form>
   </div>
   <div className="container2">
  
     <img src={SP} alt="image" width="100%" height="100%" />
   </div>
 </div>
 <script
   src="https://kit.fontawesome.com/021e83338f.js"
   crossorigin="anonymous"
 ></script>
 </div>
  )
}

export default Signup
