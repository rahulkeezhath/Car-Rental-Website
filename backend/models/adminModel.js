const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')


const adminSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:[true, 'Please Add UserName']
    },
    password:{
        type:String,
        required:[true, 'Please Type Password']
    }
})

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id},process.env.JWTPRIVATEKEY,{expiresIn:"10d"})
    return token
}

const Admin = mongoose.model("admin",adminSchema)

const validate = (data)=> {
    const schema = Joi.object({
        userName:Joi.string().required().label("UserName"),
        password:passwordComplexity().required().label("Password")
    })
    return schema.validate(data)
}

module.exports = {Admin, validate}