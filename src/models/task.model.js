const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    taskname: {
        required: true,
        type: String
    },
    deadline: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    owner: {
        required: true,
        type: String
    }
})

const TaskModel = mongoose.model('Task', taskSchema)
module.exports = TaskModel