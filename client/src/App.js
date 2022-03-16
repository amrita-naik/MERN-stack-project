import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import People from './pages/people/People';
import Notes from './pages/notes/Notes';
import Tasks from './pages/tasks/Tasks'
import Chat from './pages/chat/Chat';
import NavBar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'

import { io } from "socket.io-client";
import {useEffect} from 'react'
import Auth from './pages/auth/Auth';


import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";




const socket = io.connect("http://localhost:3001");

function App() {

const [user, setUser] = useState(null);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);

const room = 123

const refreshToken = async () => {
  try {
    const res = await axios.post("/refresh", { token: user.refreshToken });
    setUser({
      ...user,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwt_decode(user.accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["authorization"] = "Bearer " + data.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/login", { username, password });
    setUser(res.data);
    if (username !== "" ) {
      socket.emit("join_room", room);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async (id) => {
  setSuccess(false);
  setError(false);
  try {
    await axiosJWT.delete("/users/" + id, {
      headers: { authorization: "Bearer " + user.accessToken },
    });
    setSuccess(true);
  } catch (err) {
    setError(true);
  }
};


  return (
    <div className="App">
      {user ? (
      <Router >
        <NavBar />
        
        <div className="app-container">
          <SideBar />
          <Routes>
            
            <Route path='/' element={<Home />} />
            <Route path='/people' element={<People username={username}  />}/>
            <Route path='/notes' element={<Notes />}/>
            <Route path='/tasks' element={<Tasks />}/>
            <Route path='/chat' element={<Chat socket={socket} username={username} room={room}/>}/>
          </Routes>
        </div>
      </Router>
      ) : (
        <Auth handleSubmit={handleSubmit} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      )}
    </div>
  );
}

export default App;
