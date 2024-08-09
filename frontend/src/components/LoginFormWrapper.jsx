import React, { useState } from 'react'
import LoginForm from './LoginForm'

const LoginFormWrapper = ({ handleLogin }) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div className="form-container">
      {!loginVisible ? (
        <button onClick={() => setLoginVisible(true)} className="button login-button standalone">Log In</button>
      ) : (
        <div className="login-form-wrapper">
          <LoginForm handleSubmit={handleLogin} />
          <button onClick={() => setLoginVisible(false)} className="button cancel-button">Cancel</button>
        </div>
      )}
    </div>
  )
}

export default LoginFormWrapper