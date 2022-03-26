const router = require("express").Router();
const ChatModel = require('../models/chat.model')

router.post('/chats', async (req, res) => {
    const newMessage = new ChatModel({
        author: req.body.author,
        message: req.body.message,
        time: req.body.time,
        date: req.body.date,
    })
    try {
        const message = await newMessage.save();
        res.status(201).json(message);
      } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
})

router.get('/get-chats', (req, res) => {
  ChatModel.find({}, (err, result) => {
    if(err){
      res.json(err)
    }else{
      res.json(result)
    }
  })
})

module.exports = router