const express = require('express')
const app = express()
const multer = require('multer')

app.use(express.json())

const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require("dotenv")
const {Server} = require('socket.io')
const http = require('http')
const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");

const TaskModel = require('./models/task.model')
const NoteModel = require('./models/note.model')
const UserModel = require('./models/user.model')
const FileModel = require('./models/file.model')

const authRoute = require('./routes/authRoute')
const chatRoute = require('./routes/chatRoute')

dotenv.config();
app.use(cors())

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(console.log('mongo connected'))

const server = http.createServer(app)

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});
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

app.delete('/api/delete-task/:id', async (req, res) => {
    TaskModel.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    });

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

app.delete('/api/delete-note/:id', (req, res) => {
    NoteModel.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

//users

app.get('/api/get-users', (req, res) => {
  UserModel.find({}, (err, result) => {
      if(err){
          res.json(err)
      }else{
          res.json(result)
      }
  })
})

app.post('/api/upload', upload.single("myFile"), async (req, res) => {
  try {
    const newFile = await FileModel.create({
      name: req.file.filename,
    });
    res.status(200).json({
      status: "success",
      message: "File created successfully!!",
    });
  } catch (error) {
    res.json({
      error,
    });
    console.log(error)
  }
})

app.get("/api/getFiles", async (req, res) => {
  try {
    const files = await FileModel.find();
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
});

//sign up
app.use('/api', authRoute)


//socket io
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  

io.on('connection', (socket) => {

    socket.on("join_room", (data) => {
      socket.join(data);
      // console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
        //console.log(data)
    })

    socket.on('send_notification', ({room, senderName}) => {
      socket.to(room).emit('get_notification', senderName)
    })
})
//chats
app.use('/api', chatRoute)

server.listen(3001, (req, res) => {
    console.log('server is running');
})
