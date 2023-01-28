const { User, validation} = require('../models/userModel')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');


const userSignup = asyncHandler(async(req,res)=>{
    try {
       const {error} = validation(req.body);
       if(error)
        return res.status(400).send({message: error.details[0].message})
        const user = await User.findOne({email:req.body.email})
        if(user)
            return res.status(409).send({message:"User with given email already exist!"})
            const salt = await bcrypt.genSalt(Number(process.env.SALT))
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            console.log("aksnfjlnad",hashPassword);
            await new User({...req.body,password: hashPassword}).save()
            res.status(201).send({message:"User Created Successfully"})
    } catch (error) {
        res.status(500).send({message:"Interval Server Error"})
    }
})


const userLogin = asyncHandler(async (req,res) => {
    try {
        const {error} = validate(req.body)
        console.log("error",error);
        if(error)
        return res.status(400).send({message: error.details[0].message})
    
        const user = await User.findOne({email: req.body.email})
       
        if(!user)
            return res.status(401).send({message:"Invalid Email or Password"})
    
            const validPassword = await bcrypt.compare(
                req.body.password,user.password
                )
            if(!validPassword)
                return res.status(401).send({message:"Invalid Email or Password"})
    
                const token = user.generateAuthToken()
                res.status(200).send({data: token,message:"Logged in Successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
    })
    
    const validate = (data) => {
    const schema = Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password")
    })
    
    return schema.validate(data)
    }


module.exports={
    userSignup,
    userLogin
}