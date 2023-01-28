const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')


const userSchema = new mongoose.Schema({
    fullName: {
        type:String, 
        required:[true, 'Please Add Name']
    },
    email:{
         type: String,
         required:true,
         unique: [true, 'Please Add Email']
    },
    phoneNumber:{
         type: String,
         required: [true, 'Please Add Phone Number']
    },
    password: {
        type: String,
        required:[true, 'Please Add Password']
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id},process.env.JWTPRIVATEKEY,{expiresIn:"10d"})
    return token
}

const User = mongoose.model("user",userSchema)

const validate = (data)=>{
    const schema = Joi.object({
        fullName:Joi.string().required().label("Full Name"),
        email:Joi.string().email().required().label("Email"),
        phoneNumber:Joi.number().required().label("Phone Number"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(data)
}


module.exports = {User, validate}