const express = require('express')
const mongoose = require('mongoose')
const app = express()
const TaskModel = require('./models/task.model')
const NoteModel = require('./models/note.model')
const cors = require('cors')

const db = 'mongodb+srv://amrita:amrita@cluster0.6h9le.mongodb.net/react-project?retryWrites=true&w=majority'
mongoose.connect(db)

app.use(express.json())
app.use(cors())

//tasks
app.get('/api/get-tasks', (req, res) => {
    TaskModel.find({}, (err, result) => {
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

app.post('/api/create-task', async (req, res) => {
    const task = req.body
    const newTask = new TaskModel(task);
    await newTask.save()
    res.json(task)
})

//notes
app.get('/api/get-notes', (req, res) =>{
    NoteModel.find({}, (err, result) => {
        if(err){
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
})

app.post('/api/create-note', async (req, res) => {
    const note = req.body
    const newNote = new NoteModel(note);
    await newNote.save()
    res.json(note)
})

app.listen(3001, (req, res) => {
    console.log('server is running');
})