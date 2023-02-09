const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Add Name']
    },
    rent: {
        type : String,
        required: [true, "Please Add Rent" ]
    },
    body: {
        type: String,
        required: [true, "Please Add Body"]
    },
    place: {
        type: String,
        required: [true, "Please Add Place"]
    },
    model: {
        type: String,
        required: [true, "Please Add Model "]
    },
    transmission: {
        type: String,
        required: [true, "Please Add Transmission"]
    },
    fuel: {
        type: String,
        required: [true, "Please Add Fuel Type"]
    },
    brand: {
        type: String,
        required: [true, "Please Add Brand"]
    },
    image: {
            type: String,
            required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model("Cars", carSchema)