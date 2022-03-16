const router = require("express").Router();
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/auth", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(req.body.password),
        process.env.SECRET_KEY
      ).toString(),
    })
    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      console.log(newUser)
      res.status(500).json(err);
      console.log(err)
    }  
})
module.exports = router;