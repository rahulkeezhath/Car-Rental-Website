const {Admin} = require('../models/adminModel')
const {User} = require('../models/userModel')
const Place = require('../models/availablePlaceModel')
const Brand = require('../models/brandModel')
const Cars = require('../models/carModel')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
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
        console.log(error);
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

    const getPlace = asyncHandler(async (req, res) => {
        const places = await Place.find().sort({ createdAt: -1 })
        res.status(200).json(places)
    })
    
    
    // @desc Admin add available places
    // @route POST /api/admin/addPlace
    // @access Private
    const addPlace = asyncHandler(async (req, res) => {
        const { place } = req.body
        if (!place) {
            throw new Error('Please fill the field')
        }
    
        const PlaceToUpperCase = place.toUpperCase()
        const CheckPlace = await Place.findOne({ place: PlaceToUpperCase })
    
        if (CheckPlace) {
            throw new Error('Place Already Exist')
        } else {
            const addPlace = await Place.create({ place: PlaceToUpperCase })
    
            res.status(201).json({ message: `${PlaceToUpperCase} addedd successfully` })
        }
    })
    
    // @desc Admin delete place
    // @route DELETE /api/admin/deleteBrand
    // @access Private
    const deletePlace = asyncHandler(async (req, res) => {
        if (!req.query.id) {
            res.status(400)
            throw new Error("Place not found")
        }
        const deletePlace = await Place.deleteOne({ _id: req.query.id })
    
        if (deletePlace) {
            res.status(200).json({ message: `Deleted successfully` })
        } else {
            res.status(400)
            throw new Error('Something went wrong!')
        }
    })
    
    
    // @desc Admin get brands
    // @route GET /api/admin/getBrands
    // @access Private
    const getBrands = asyncHandler(async (req, res) => {
        const brands = await Brand.find().sort({ createdAt: -1 })
        res.status(200).json(brands)
    })
    
    // @desc Admin add Brands
    // @route POST /api/admin/addBrand
    // @access Private
    const addBrand = asyncHandler(async (req, res) => {
        const { brand } = req.body
        if (!brand) {
            throw new Error('Please fill the field')
        }
    
        const BrandToUpperCase = brand.toUpperCase()
        const CheckBrand = await Brand.findOne({ brand: BrandToUpperCase })
    
        if (CheckBrand) {
            throw new Error('Brand Already Exist')
        } else {
            const addBrand = await Brand.create({ brand: BrandToUpperCase })
    
            res.status(201).json({ message: `${BrandToUpperCase} addedd successfully` })
        }
    })
    
    // @desc Admin delete Brands
    // @route DELETE /api/admin/deleteBrand
    // @access Private
    const deleteBrand = asyncHandler(async (req, res) => {
        if (!req.query.id) {
            res.status(400)
            throw new Error("Brand not found")
        }
        const deleteBrand = await Brand.deleteOne({ _id: req.query.id })
    
        if (deleteBrand) {
            res.status(200).json({ message: 'Deleted successfully' })
        } else {
            res.status(400)
            throw new Error('Something went wrong!')
        }
    })
    
    
    // @desc Admin Cars
    // @route GET /api/admin/cars
    // @access Private
    const adminCars = asyncHandler(async (req, res) => {
        const cars = await Cars.find({ isDeleted: false }).sort({ createdAt: -1 })
        if (cars) {
            res.status(200).json(cars)
        } else {
            res.status(400)
            throw new Error('Something went wrong!')
        }
    })
    
    // @desc Admin add cars
    // @route POST /api/admin/addCars
    // @access Private
    const addCars = asyncHandler(async (req, res) => {
        const {
            name,
            rent,
            body,
            place,
            model,
            transmission,
            fuel,
            brand,
            description,
            image
        } = req.body
        if (!name || !rent || !body || !place || !model || !transmission || !fuel || !brand ||!description || !image) {
            res.status(400)
            throw new Error('Please fill all the fields')
        }
        const imageResult = await cloudinary.uploader.upload(image, {
            folder: 'Fastrack',
        })
        const car = await Cars.create({
            name, rent,body, place, model, transmission, fuel, brand,description,
            image: imageResult.url
        })
        if (car) {
            res.status(201)
            res.json({ message: 'Your car has been successfully added' })
        } else {
            res.status(400)
            throw new Error('Sorry! Something went wrong')
        }
    
    })
    
    // @desc Admin delete car
    // @route PUT /api/admin/deleteCar
    // @access Private
    const deleteCar = asyncHandler(async (req, res) => {
        if (!req.query.id) {
            res.status(400)
            throw new Error("Car not found")
        }
        const deleteCar = await Cars.findByIdAndUpdate(req.query.id, { isDeleted: true })
    
        const car = await Cars.findOne({ _id: req.query.id })
        if (deleteCar) {
            res.status(200).json({ message: `${car.name} deleted successfully` })
        } else {
            res.status(400)
            throw new Error('Something went wrong!')
        }
    })
    
    // @desc Admin edit car
    // @route PUT /api/admin/editCar
    // @access Private
    const editCar = asyncHandler(async (req, res) => {
        const {
            name,
            rent,
            body,
            place,
            Model,
            transmission,
            fuel,
            brand,
            description,
            image
        } = req.body
    
        if (!name || !rent || !body || !place || !Model || !transmission || !fuel || !brand ||!description || !image) {
            res.status(400)
            throw new Error('Please fill all the fields')
        }
        if (!req.query.id) {
            res.status(400)
            throw new Error('Car not found')
        }
        const carUpdated = await Cars.findByIdAndUpdate(req.query.id, {
            name, rent, body, place, Model, transmission, fuel, body, brand, description, image
        })
    
        if (carUpdated) {
            res.status(200).json({ message: 'Updated Successfully' })
        } else {
            res.status(400)
            throw new Error('Something went wrong!')
        }
    
    
    
    })








  

module.exports = {
    adminLogin,
    adminUsers,
    blockUser,
    unblockUser,
    getPlace,
    addPlace,
    deletePlace,
    getBrands,
    addBrand,
    deleteBrand,
    adminCars,
    addCars,
    deleteCar,
    editCar
}