const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
    },
    name:{
        type: String,
        required: [true, 'Uploaded must have a name']
    }
})

const FileModel = mongoose.model("File", FileSchema) 

module.exports = FileModel