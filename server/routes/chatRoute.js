const router = require("express").Router();
const ChatModel = require('../models/chat.model')

router.post('/chats', async (req, res) => {
    const newMessage = new ChatModel({
        username: req.body.username,
        message: req.body.message,
        time: req.body.time,
    })
    try {
        const message = await newMessage.save();
        res.status(201).json(message);
      } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
})

module.exports = router