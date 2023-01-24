import React from 'react'
import './Login.css'

const Login = () => {
  return (
   
<div class="mainLogin">
        <div class="container">
            <div class="login">
                <div class="row lgn">
                    <div class="col-md img">    
                    </div>
                    <div class="col-md">
                        <form class="login-form" action="/e-commrce/admin/index.php" method="POST">
                            <h4>Admin Login</h4>
                            <div class="form-group">
                                <input class="form-control user" name="user" type="text"autocomplete="off" placeholder="User Name"/>
                                <i class="fa ic fa-envelope" aria-hidden="true"></i>
                            </div>
                            <div class="form-group">
                                <input class="form-control pass" type="password" name="pass" placeholder="Password" autocomplete="new-password"/>
                                <i class="fa ic fa-lock" aria-hidden="true"></i>
                            </div>
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
