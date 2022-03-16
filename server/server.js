const express = require('express')
const mongoose = require('mongoose')
const app = express()
const TaskModel = require('./models/task.model')
const NoteModel = require('./models/note.model')
const cors = require('cors')
const dotenv = require("dotenv")
const {Server} = require('socket.io')
const http = require('http')
const jwt = require('jsonwebtoken')

dotenv.config();

mongoose.connect(process.env.DB_URL)
    .then(console.log('mongo connected'))

app.use(express.json())
app.use(cors())

const server = http.createServer(app)

const users = [
    {
      id: "1",
      username: "anto",
      password: "santo123",
      isAdmin: true,
    },
    {
      id: "2",
      username: "ambo",
      password: "ambya123",
      isAdmin: false,
    },
    {
      id: "3",
      username: "eren",
      password: "mikasa1",
      isAdmin: false,
    },
  ];

let refreshTokens = [];

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

//login

app.post("/api/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
  
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
      refreshTokens.push(newRefreshToken);
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  
    //if everything is ok, create new access token, refresh token and send to user
  });
  
  const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
      expiresIn: "5s",
    });
  };
  
  const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
  };
  
  

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => {
      return u.username === username && u.password === password;
    });
    if (user) {
      //Generate an access token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.json({
        username: user.username,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json("Username or password incorrect!");
    }
  });
  
  const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };
  
  app.delete("/api/users/:userId", verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      res.status(200).json("User has been deleted.");
    } else {
      res.status(403).json("You are not allowed to delete this user!");
    }
  });
  
  app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  });
  
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
})

server.listen(3001, (req, res) => {
    console.log('server is running');
})

//socket io

