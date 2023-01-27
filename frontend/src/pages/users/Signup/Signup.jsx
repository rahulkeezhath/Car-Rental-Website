import React from "react";
import "./Signup.css";
import SP from "../../../assets/Signup.jpeg";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
 

function Signup() {
  axios.defaults.baseURL = "http://localhost:5000";


  const {register, formState: {errors}, handleSubmit} = useForm()



  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const onSubmit = async () => {
    try {
      const url = "/users/userSignup";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="first1">
      <div className="main mb-5 mt-5">
        <div className="container1">
          <div className="titulo">
            <h1>Welcome To Fastrack</h1>
            <p className="sub">Signup in the Page for Accessing Cars</p>
          </div>
          <form id="form" class="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label for="email">Full Name</label>
              <input
                type="text"
                id="fName"
                name="fullName"
                placeholder="Full Name"
                {...register("fullName",{required:true})}
                onChange={handleChange}
                value={data.fullName}
              />
              <error>
                {errors.fullName?.type === 'required' && "Name is required"}
              </error>
              <i id="icon2" onclick="eyeClick()" className=""></i>
              {/* <i class="fa-solid fa-circle-check"></i> */}
            </div>

            <div className="form-control">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                {...register("email",{required:true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z-9-]+\.[a-zA-Z0-9-.]+$/i})}
                onChange={handleChange}
                value={data.email}
              />
               <error>
                {errors.email?.type === 'required' && "Email is required"}
                {errors.email?.type === 'pattern' && "Email is not Valid"}
              </error>
              <i id="icon2" onclick="eyeClick()" className=""></i>
              {/* <i class="fa-solid fa-circle-check"></i> */}
            </div>

            <div className="form-control">
              <label for="email">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                {...register("phoneNumber",{required:true,minLength:7, maxLength:10})}
                onChange={handleChange}
                value={data.phoneNumber}
              />
              <error>
              {errors.phoneNumber?.type === 'minLength' && "Entered Number is Less than 6 digits"}
              {errors.phoneNumber?.type === 'maxLength' && "Entered Number is More than 10 digits"}
              </error>
              <i id="icon2" onclick="eyeClick()" className=""></i>
              {/* <i class="fa-solid fa-circle-check"></i> */}
            </div>

            <div className="form-control">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                {...register("password",{required:true ,minLength:5, maxLength:20})}
                onChange={handleChange}
                value={data.password} 
              />
              <error>
              {errors.password?.type === 'minLength' && "Entered Password is Less than 5 digits"}
              {errors.password?.type === 'maxLength' && "Entered Number is More than 20 digits"}
              </error>
              <i id="icon" onclick="eyeClick()" className=""></i>
              {/* <i onclick="eyeClick()" class="fa-solid fa-circle-check"></i> */}
            </div>
            {error && <div className="error_msg">{error}</div>}
            <br />
            <button  class="button-entrar" type="submit">
              Signup
            </button>
            <br />
            <Link to={"/login"}>
              <button class="button-criar" type="submit">
                Login
              </button>
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
  );
}

export default Signup;
