const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    username: {type: String, reqiured: true},
    message: {type: String},
    time: {type: Number}
}, {collection: "chats", timestamps: true})

const ChatModel = mongoose.model("Chat", ChatSchema)

module.exports = ChatModel