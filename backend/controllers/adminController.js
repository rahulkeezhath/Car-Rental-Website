const {Admin} = require('../models/adminModel')
const {User} = require('../models/userModel')
const Place = require('../models/availablePlaceModel')
const Brand = require('../models/brandModel')
const Cars = require('../models/carModel')
const Drivers = require('../models/driverModel')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../utils/cloudinary')
const Bookings = require('../models/bookingModel')

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
    const blockAndUnblockUser = asyncHandler(async (req,res) => {
        if(!req.body.id){
            res.status(400)
            throw new Error('User Not Found')
        }
        const user = await User.findById(req.body.id)
        if(user.isBlocked) {
            const unBlock = await User.findByIdAndUpdate(req.body.id, {
                isBlocked: false
            })
            if(unBlock) {
                res.status(200).json({message: `${user.fullName}'s Account Unblocked`})
            } else {
                res.status(400)
                throw new Error('Something Went Wrong')
            }
        } else {
            const block = await User.findByIdAndUpdate(req.body.id, {
                isBlocked: true
            })
            if(block) {
                res.status(200).json({ message: `${user.fullName}'s Account Blocked`})
            } else {
                res.status(400)
                throw new Error('Something Went Wrong')
            }
        }
    })


    const getPlace = asyncHandler(async (req, res) => {
        try {
            const places = await Place.find().sort({ createdAt: -1 })
            res.status(200).json(places)
        } catch (error) {
            res.status(408).send({message: "Internal Server Error"}) 
        }
       
    })
    
    

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
            console.log("add place",addPlace);
            res.status(201).json({ message: `${PlaceToUpperCase} addedd successfully` })
        }
    })

    
   
    const deletePlace = asyncHandler(async (req, res) => {
        if (!req.query.id) {
            res.status(400)
            throw new Error("Place not found")
        }
        const deletePlace = await Place.deleteOne({ _id: req.query.id })
        console.log("deletePlace",deletePlace);
        if (deletePlace) {
            res.status(200).json({ message: `Deleted successfully` })
        } else {
            res.status(400)
            throw new Error('Something went wrong!')
        }
        console.log("delete",deletePlace);
    })
    
    
  
    const getBrands = asyncHandler(async (req, res) => {
        const brands = await Brand.find().sort({ createdAt: -1 })
        res.status(200).json(brands)
    })
    
    
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
    

    const adminCars = asyncHandler(async (req, res) => {
        const cars = await Cars.find().sort({ createdAt: -1 })
        if (cars) {
            res.status(200).json(cars)
        } else {
            res.status(400)
            throw new Error('Something went wrong!')
        }
    })

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

    const deleteCar = asyncHandler(async (req, res) => {
        if (!req.query.id) {
            res.status(400)
            throw new Error("Car not found")
        }

        const deleteCar = await Cars.deleteOne({_id:req.query.id})
        console.log("Delete avindo",deleteCar);

        if (deleteCar) {
            res.status(200).json({ message: 'Deleted successfully' })
        } else {
            res.status(400)
            throw new Error('Something went wrong!')
        }
        console.log("Delete aayo",deleteCar);
    })
    
 
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


    const blockAndUnblockCar = asyncHandler(async (req,res) => {
        if(!req.body.id){
            res.status(400)
            throw new Error('Car Not Found')
        }
        const car = await Cars.findById(req.body.id)
        if(car.isBlocked) {
            const unBlock = await Cars.findByIdAndUpdate(req.body.id, {
                isBlocked: false
            })
            if(unBlock) {
                res.status(200).json({message: `${car.name}  Unblocked`})
            } else {
                res.status(400)
                throw new Error('Something Went Wrong')
            }
        } else {
            const block = await Cars.findByIdAndUpdate(req.body.id, {
                isBlocked: true
            })
            if(block) {
                res.status(200).json({ message: `${car.name} Blocked`})
            } else {
                res.status(400)
                throw new Error('Something Went Wrong')
            }
        }
    })


    const adminBookings = asyncHandler(async (req,res)=> {
        const bookings = await Bookings.aggregate([
            {
                $lookup: {
                    from: 'cars',
                    localField: 'car',
                    foreignField: '_id',
                    as: 'carData'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userData'
                }
            },
            {
                $unwind: {
                    path: '$carData'
                }
            },
            {
                $unwind: {
                    path: '$userData'
                }
            },
            {
                $project: {
                    car: 0,
                    user: 0,
                    'userData.password': 0,
                    'userData.isBlocked': 0,
                    'carData.bookedSlots': 0
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])

        if(bookings) {
            res.status(200).json(bookings)
        } else {
            res.status(400)
            throw new Error('Something Went Wrong')
        }
    })


    const adminDrivers = asyncHandler(async (req,res) => {
        const drivers = await Drivers.find()
        if(drivers) {
            res.status(200).json(drivers)
        } else {
            res.status(400)
            throw new Error("Something Went Wrong")
        }
    })

    const approveDriver = asyncHandler(async (req,res) => {
        if(!req.body.id) {
            res.status(400)
            throw new Error("Driver Not Found")
        }

        const driver = await Drivers.findById(req.body.id)
        const approve = await Drivers.findByIdAndUpdate(req.body.id, {
            isApproved: true
        })

        if(approve) {
            res.status(200).json({message: `${driver.name} Account is Approved`})
        } else {
            res.status(400)
            throw new Error('Something Went Wrong')
        }
    })


    const declineDriver = asyncHandler(async (req,res) => {
        if(!req.body.id) {
            res.status(400)
            throw new Error("Driver Not Found")
        }

        const driver = await Drivers.findById(req.body.id)
        const decline = await Drivers.deleteOne({_id: req.body.id})

        if(decline) {
            res.status(200).json({message: `${driver.name} Account is Rejected`})
        } else {
            res.status(400)
            throw new Error('Something Went Wrong')
        }
    })


    const blockAndUnblockDriver = asyncHandler(async (req,res) => {
        if(!req.body.id){
            res.status(400)
            throw new Error('Driver Not Found')
        }
        const driver = await Drivers.findById(req.body.id)
        if(driver.isBlocked) {
            const unBlock = await Drivers.findByIdAndUpdate(req.body.id, {
                isBlocked: false
            })
            if(unBlock) {
                res.status(200).json({message: `${driver.name}'s Account Unblocked`})
            } else {
                res.status(400)
                throw new Error('Something Went Wrong')
            }
        } else {
            const block = await Drivers.findByIdAndUpdate(req.body.id, {
                isBlocked: true
            })
            if(block) {
                res.status(200).json({ message: `${driver.name}'s Account Blocked`})
            } else {
                res.status(400)
                throw new Error('Something Went Wrong')
            }
        }
    })

  

module.exports = {
    adminLogin,
    adminUsers,
    blockAndUnblockUser,
    getPlace,
    addPlace,
    deletePlace,
    getBrands,
    addBrand,
    deleteBrand,
    adminCars,
    addCars,
    deleteCar,
    editCar,
    blockAndUnblockCar,
    adminBookings,
    adminDrivers,
    approveDriver,
    declineDriver,
    blockAndUnblockDriver
}