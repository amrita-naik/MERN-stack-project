import './App.css';
import { Route, BrowserRouter as Router, Routes, Navigate, useNavigate } from 'react-router-dom';
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

  const room = 123

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const createUser = async (e) => {
    e.preventDefault()
    axios.post('/auth', {username, email, password})
      .then(() => {
        setUsers([...users, {username, email, password} ])
      })
  }

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);

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
  
  let navigate = useNavigate();

  const handleLogin = async (e) => {
		e.preventDefault();
		try {
      const res = await axios.post("/login", { username, password });
      setUser(res.data);

      navigate('/')
  
		} catch (error) {
      console.log(error)
		}
	};
  socket.emit("join_room", room)

  return (
    <div className="App">
      <div className="app-container">
        <Routes>
          {!user &&
            <Route path='/auth' element={ <Auth username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword}
              createUser={createUser} setUser={setUser} room={room} socket={socket} handleLogin={handleLogin} />} />}
          <Route path='/' element={user ? <Home username={username} /> : <Navigate replace to='/auth' /> } />   
          <Route path='/people' element={user ? <People /> : <Navigate replace to='/auth' /> } />   
          <Route path='/notes' element={user ? <Notes /> : <Navigate replace to='/auth' /> } />   
          <Route path='/tasks' element={user ? <Tasks /> : <Navigate replace to='/auth' /> } />   
          <Route path='/chat' element={user ? <Chat socket={socket} room={room} username={username} /> : <Navigate replace to='/auth' /> } />   
          {user &&     
          <>
            <Route exact path='/' element={ <Home username={username} /> } />
            <Route path='/people' element={<People  />}/>
            <Route path='/notes' element={<Notes />}/>
            <Route path='/tasks' element={<Tasks />}/>
            <Route path='/chat' element={<Chat socket={socket} room={room} username={username}/>}/> 
          </>
          }
        </Routes>
      </div>
        
   </div>
  );
}

export default App;
