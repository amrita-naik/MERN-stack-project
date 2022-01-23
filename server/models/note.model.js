const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
}, {collection: "notes"}
)

const NoteModel = mongoose.model("NoteList", NoteSchema)

module.exports = NoteModel