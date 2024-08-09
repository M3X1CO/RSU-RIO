import React, { useState } from 'react'
import LoginForm from './LoginForm'

const LoginFormWrapper = ({ handleLogin }) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div className="form-container">
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)} className="login-button">Log In</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <LoginForm handleSubmit={handleLogin} />
        <div className="centered-button-container">
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default LoginFormWrapper