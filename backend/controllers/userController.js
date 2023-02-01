const { User} = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const asyncHandler = require('express-async-handler');
const {doSms, verifyOtp} = require('../helpers/otpVerification')


const userSignup = asyncHandler(async(req,res)=>{
    try{
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
    if(otpSend) {
        res.status(200).json(true)
    }
    } catch (error) {
    res.status(500).send({message: "Internal Server Error"}) 
}

})


const otpVerification = asyncHandler(async (req,res) => {
    try {
    const { fullName, email, password, phoneNumber, otpCode } = req.body
    const otpVerify = await verifyOtp(phoneNumber, otpCode)
    if (otpVerify.status == 'approved') {
        
        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

          // Create User
        const user = await User.create({
        fullName,email,phoneNumber,
        password: hashedPassword
    })
    if(user) {
        res.status(201).json({
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateAuthToken(user._id)
        })
    }
    }else{
        res.status(400)
        throw new Error('Invalid OTP')
    }
    }catch (error) {
        res.status(408).send({message: "Internal Server Error"}) 
    }
})


const userLogin = asyncHandler(async (req,res) => {
    try{
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
    }catch (error) {
    res.status(500).send({message: "Internal Server Error"}) 
}
})


const getUserDetails = asyncHandler(async( req, res)=>{
    try {
    const { fullName, email, phoneNumber } = await User.findById(req.user.id)
    res.status(200).json({
        fullName,email,phoneNumber
    })
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"}) 
    }
})


const generateAuthToken = (id) => {
    return jwt.sign({id},process.env.JWTPRIVATEKEY,{expiresIn:"10d"})
    }
 


module.exports={
    userSignup,
    otpVerification,
    userLogin,
    getUserDetails
}