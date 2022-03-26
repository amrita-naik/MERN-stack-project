const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    author: {type: String, reqiured: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
    date: {type: String, required: true},
}, {timestamps: true, collection: "chats"})

const ChatModel = mongoose.model("Chat", ChatSchema)

module.exports = ChatModel