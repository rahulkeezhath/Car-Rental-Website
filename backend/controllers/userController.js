const { User, validation} = require('../models/userModel')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const bcrypt = require('bcrypt')
require('dotenv').config()
const asyncHandler = require('express-async-handler');
const {doSms, verifyOtp} = require('../helpers/otpVerification')


const userSignup = asyncHandler(async(req,res)=>{
     const { fullName, email, phoneNumber, password} = req.body

     if(!fullName || !email || !phoneNumber || !password) {
        res.status(400)
        throw new Error("Please Add all Fields")
     }

     // Check if user Exists
     const userExists = await User.findOne({email})

     if(userExists) {
        res.status(400)
        throw new Error('User already exists')
     }

    // Send OTP

    const otpSend = await doSms(phoneNumber)
    console.log("fewfwe",otpSend);
    if(otpSend) {
        res.status(200).json(true)
    }

})


const otpVerification = asyncHandler(async (req,res) => {
    const { fullName, email, password, phoneNumber, otpCode } = req.body
    console.log(req.body);
    const otpVerify = await verifyOtp(phoneNumber, otpCode)
    console.log(otpVerify);
    if (otpVerify.status == 'approved') {
        
        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log("jfjhe");

          // Create User
        const user = await User.create({
        fullName,email,phoneNumber,
        password: hashedPassword
    })
    console.log("sfwef",user);
    if(user) {
        res.status(201).json({
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateAuthToken(user._id)
        })
    }
    console.log("kehgfhwek");
    }else{
        res.status(400)
        console.log("OTP INVALID");
        throw new Error('Invalid OTP')
    }
})


const userLogin = asyncHandler(async (req,res) => {
    const { email , password } = req.body

    // Check for user email
    const user = await User.findOne({email})

    // Check for user status
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateAuthToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})




    const generateAuthToken = (id) => {
        return jwt.sign({id},process.env.JWTPRIVATEKEY,{expiresIn:"10d"})
    }
 


module.exports={
    userSignup,
    otpVerification,
    userLogin
}