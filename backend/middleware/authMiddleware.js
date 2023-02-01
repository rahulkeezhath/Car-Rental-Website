const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Admin = require('../models/adminModel')

const protect = asyncHandler(async (req,res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {

            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error);
            res.status(401) //Not Authorized
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, No token')
    }
})


const adminProtect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)

            // Get User from token
            req.admin = await Admin.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error);
            res.status(401)
            console.log("Ouiehfiei");
            throw new Error('Not Authorized, No Token')
        }
    }

    if(!token) {
        res.status(401)
        console.log("fkjejfh");
        throw new Error('Not Authorized, No Token')
    }
})

module.exports = { protect, adminProtect }