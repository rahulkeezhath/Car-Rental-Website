const {Admin} = require('../models/adminModel')
const Cars = require('../models/carModel')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { User } = require('../models/userModel')
const { response } = require('express')
const cloudinary = require('../utils/cloudinary')

const adminLogin = asyncHandler(async (req,res) => {
    try{
        const {error} = validate(req.body)
        
        if(error)
        return res.status(400).send({message: error.details[0].message})

        const admin = await Admin.findOne({userName: req.body.userName})

        if(!admin)
        return res.status(401).send({message:"Invalid UserName or Password"})

        const validPassword = await bcrypt.compare(
            req.body.password,admin.password
        )
        if(!validPassword)
            return res.status(401).send({message:"Invalid UserName or Password"})

            const token = admin.generateAuthToken()
            res.status(209).send({data: token,message:"Logged in Successfully"})

    } catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
})

    const validate = (data) => {
        const schema = Joi.object({
            userName:Joi.string().required().label("UserName"),
            password:Joi.string().required().label("Password")
        })
        return schema.validate(data)
    }

    // AdminUsers
    const adminUsers = asyncHandler(async (req,res) => {
        const users = await User.find()
        if(users) {
            res.status(200).json(users)
        } else {
            res.status(400)
            throw new Error('User Not Found')
        }
    })

    // Block and Unblock Users
    const blockUser = asyncHandler(async (req,res) =>{
       const id = req.params.id;
       await User.findByIdAndUpdate(id,{$set:{isBlocked:true}}).then((response) =>{
        res.status(200).json({blocked:true,message: "User Blocked Successfully"})
       })
    })

    const unblockUser = asyncHandler(async (req,res) => {
        const id = req.params.id;
        await User.findByIdAndUpdate(id,{$set:{isBlocked:false}}).then((response) => {
            res.status(200).json({blocked:false, message:"User Unblocked Succesfully"})

        })
    })


    const AddCars = asyncHandler(async (req, res) => {
        const {name, rent, body, place, Model, transmission, fuel, brand, image } = req.body

        if(!name || !rent || !body || !place || !Model || !transmission || !fuel || !brand || !image) {
            res.status(400)
            throw new Error("Please Fill All the Fields")
        }

        const imageResult = await cloudinary.uploader.upload(image, {
            folder: 'Fastrack'
        })

        const car = await Cars.create({
            name, rent, place, brand, transmission, fuel, body, 
            image: {
                public_id: imageResult.public_id,
                url: imageResult.secure_url
            }
        })

        if(car) {
            res.status(201)
            res.json({ message: "Your Car has been Successfully Added"})
        } else {
            res.status(400)
            throw new Error("Not Added")
        }
    })
  

module.exports = {
    adminLogin,
    adminUsers,
    blockUser,
    unblockUser,
    AddCars  
}