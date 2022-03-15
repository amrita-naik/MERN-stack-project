import React from 'react'
import './auth.css'

function Auth({handleSubmit, setPassword, setUsername}) {



  return (
    <div className="auth">
      <div className="auth-container">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form>
              <label htmlFor="chk" aria-hidden="true">Sign up</label>
              <input className='auth-input' type="text" name="txt" placeholder="User name" required="" />
              <input className='auth-input' type="email" name="email" placeholder="Email" required="" />
              <input className='auth-input' type="password" name="pswd" placeholder="Password" required="" />
              <button className='auth-btn'>Sign up</button>
            </form>
          </div>
          <div className="login">
            <form onSubmit={handleSubmit}>
              <label htmlFor="chk" aria-hidden="true">Login</label>
              <input
              className='auth-input'
                type="text"
                placeholder="username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
              className='auth-input'
                type="password"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="auth-btn">
                Login
              </button>
            </form>
          </div>
      </div>
    </div>

  )
}

export default Auth