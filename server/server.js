const express = require('express')
const mongoose = require('mongoose')
const app = express()
const TaskModel = require('./models/task.model')
const NoteModel = require('./models/note.model')
const cors = require('cors')
const dotenv = require("dotenv")
const {Server} = require('socket.io')
const http = require('http')

dotenv.config();

mongoose.connect(process.env.DB_URL)
    .then(console.log('mongo connected'))

app.use(express.json())
app.use(cors())

const server = http.createServer(app)

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

app.get('/api/chat', async (req, res) => {
    console.log('chat page')
})

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  

io.on('connection', (socket) => {

    socket.on('send_msg', (data) => {
        socket.emit('receive_msg', data)
        console.log(data)
    })
})

server.listen(3001, (req, res) => {
    console.log('server is running');
})

//socket io

