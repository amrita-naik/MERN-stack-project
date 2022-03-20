import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

import './auth.css'

function Auth({room, handleLogin, setUser, username, setUsername, email, setEmail, password, setPassword, createUser}) {  

  
  return (
    <div className='auth'>
      <h1>Weclome to StudyRoom</h1>
      <div className="auth-wrapper">
        <div className="auth-container">
          <input type="checkbox" id="chk"  aria-hidden='true' />
          <div className="login">
            <form onSubmit={handleLogin}>
              <label htmlFor="chk" aria-hidden="true">Login</label>
              <input
                className='auth-input'
                type="text"
                placeholder="username"
                value={username} onChange = {(e) => setUsername(e.target.value)}
                required
              />
              <input
                className='auth-input'
                type="password"
                placeholder="password"
                required
                value={password} onChange = {(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="auth-btn">
                Login
              </button>
            </form>
          </div>
          <div className="signup">
            <form onSubmit={createUser}>
              <label htmlFor="chk" >Sign up</label>
              <input className='auth-input' type="text" placeholder="User name" value={username} onChange = {(e) => setUsername(e.target.value)}/>
              <input className='auth-input' type="email" placeholder="Email" value={email} onChange = {(e) => setEmail(e.target.value)}/>
              <input className='auth-input' type="password" placeholder="Password" value={password} onChange = {(e) => setPassword(e.target.value)} />
              <button className='auth-btn'>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Auth