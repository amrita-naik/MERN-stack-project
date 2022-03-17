const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: { type: Boolean, default: false },
}, {collection: "users", timestamps: true})


const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel