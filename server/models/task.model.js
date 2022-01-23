const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    text: {type: String, required: true}
}, {collection: 'tasks'}
)

const TaskModel = mongoose.model('TaskData', TaskSchema)

module.exports = TaskModel