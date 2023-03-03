const mongoose = require('mongoose')

const meesageSchema = new mongoose.Schema({
    chatId:{
        type: String
    },
    sender:{
        type: String
    },
    text:{
        type:String
    }
},{timestamps: true})

module.exports = mongoose.model("message", meesageSchema)