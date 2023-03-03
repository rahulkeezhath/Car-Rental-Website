const Chat = require('../models/chatModel')
const asyncHandler = require('express-async-handler');

// Create chat
const createChat = asyncHandler(async(req,res) => {
    const newChat = new Chat({
        members:[req.body.senderId, req.body.receiverId]
    })
    try {     
        const result = await newChat.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }  
})


// Get chat
const getAllChats = asyncHandler(async(req,res) => {
    try {
        const chats = await Chat.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chats)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})



module.exports = {
    createChat,
    getAllChats,
}