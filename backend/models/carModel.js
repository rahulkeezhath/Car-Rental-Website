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
    Model: {
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
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }

})

module.exports = mongoose.model("Cars", carSchema)