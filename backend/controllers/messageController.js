const Message = require('../models/MessageModel')
const asyncHandler = require('express-async-handler');


// Add Message 
const addMessage = asyncHandler(async (req,res) => {
    const newMessage = new Message(req.body)
    try {
        const result = await newMessage.save()
        res.status(200).json(result)       
    } catch (error) {
        res.status(500).json(error)
    }
})


// Get Message
const getMessage = asyncHandler(async (req,res) => {
    try {
        const result = await Message.find({chatId:req.params.chatId})
        res.status(200).json(result)      
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {
    addMessage,
    getMessage
}