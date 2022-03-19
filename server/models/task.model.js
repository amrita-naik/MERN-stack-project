const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    id: {type: String},
    text: {type: String, required: true}
}, {collection: 'tasks'}
)

const TaskModel = mongoose.model('TaskData', TaskSchema)

module.exports = TaskModel