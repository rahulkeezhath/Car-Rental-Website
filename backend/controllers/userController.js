const { User} = require('../models/userModel')
const Cars = require('../models/carModel')
const Bookings = require('../models/bookingModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const asyncHandler = require('express-async-handler');
const {doSms, verifyOtp} = require('../helpers/otpVerification')
const { default: mongoose } = require('mongoose')
const moment = require('moment')


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
    const user = await User.findOne({
        $and: [{email:email}, {isBlocked: false}] })
    // Check for user status
    if(user && user.isBlocked == false && (await bcrypt.compare(password, user.password))) {
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
    const id = req.params.data_id
    console.log("get id", id);
    try {
        const userData = await User.findOne({_id:id})
        res.status(200).json(userData)
        console.log("userData",userData);
    } catch (error) {
        console.log("error")
        console.log(error);
    }
})




const updateUserProfile = asyncHandler(async (req,res) => {

    const id = req.body.id
    console.log("id",id);
   try {
    await User.findByIdAndUpdate(id,{$set:
    {
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    }},{upsert:true}).then((response)=>{
        res.status(200).json({response:response, message:"User Updated Successfully"})
    })
    console.log("update aayi",);
   } catch (error) {
        console.log(error);
   }
})


const getCars = asyncHandler(async (req,res) => {
    const cars = await Cars.find({isDeleted: false}).sort({createdAt: -1})
    if(cars) {
        res.status(200).json(cars)
    } else {
        res.status(400)
        throw new Error("Cars Not Getting")
    }
})

const getCar = asyncHandler(async (req,res) => {
    const car = await Cars.findById(req.query.id)
    if(car) {
        res.status(200).json(car)
    } else {
        res.status(400)
        throw new Error("Something Went Wrong!")
    }
})

const bookCar = asyncHandler(async (req,res) => {
    const { user, car, totalAmount, totalDays, pickUpDate, droffOffDate, dropOffCity, driverRequire } = req.body
    console.log("carrrr",req.body);
    if(!user, !car, !totalAmount, !totalDays, !pickUpDate, !droffOffDate, !dropOffCity) {
        res.status(400)
        throw new Error("All Fields are Required")
    } else {
        const  theCar = await Cars.findById(car)
        console.log("kjfhkej",theCar);
        let selectedFrom = moment(pickUpDate)
        console.log("ijjnf",selectedFrom);
        let selectedTo = moment(droffOffDate)
        console.log("ohu",selectedTo);
        console.log("theCar",theCar);
        
        if(theCar.bookedSlots.length > 0) {
            for (let slot of theCar.bookedSlots) {
                if (selectedFrom.isBetween(moment(slot.from), moment(slot.to), null, '[)') || selectedTo.isBetween(moment(slot.from), moment(slot.to), null, '(]')) {
                    res.status(400)
                    throw new Error('Slot is Already Reserved')
                }
            }
        }
        theCar.bookedSlots.push({ from: pickUpDate, to: droffOffDate})
        await theCar.save()
        const bookCar = await Bookings.create({
            user, car, totalAmount, totalHours: totalDays, 'bookedSlots.from': pickUpDate, 'bookedSlots.to': droffOffDate, dropoffCity: dropOffCity, driverRequire, transactionId: 'pending'
        })
        if (bookCar && theCar) {
            res.status(201).json(bookCar)
        } else {
            res.status(400)
            throw new Error('Something went wrong')
        }
    }
})


const myBookings = asyncHandler(async (req,res) => {
    const id = req.query.id
    if (!id) {
        res.status(400)
        throw new Error('User is Not Found')
    }
    const userBookings = await Bookings.aggregate([
        {
            $match: { user: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: 'cars',
                localField: 'car',
                foreignField: '_id',
                as: 'carData'
            }
        },
        {
            $sort: { createdAt: -1 } 
        }
    ])
    res.json(userBookings)
})




const generateAuthToken = (id) => {
    return jwt.sign({id},process.env.JWTPRIVATEKEY,{expiresIn:"10d"})
    }
 


module.exports={
    userSignup,
    otpVerification,
    userLogin,
    getUserDetails,
    updateUserProfile,
    getCars,
    getCar,
    bookCar,
    myBookings
}