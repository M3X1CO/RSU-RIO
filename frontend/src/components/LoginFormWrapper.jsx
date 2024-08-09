import React, { useState } from 'react'
import LoginForm from './LoginForm'

const LoginFormWrapper = ({ handleLogin }) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div className="form-container">
      <div className="login-form-wrapper">
        {!loginVisible && (
          <button onClick={() => setLoginVisible(true)} className="button login-button">Log In</button>
        )}
        {loginVisible && (
          <>
            <LoginForm handleSubmit={handleLogin} />
            <button onClick={() => setLoginVisible(false)} className="button cancel-button">Cancel</button>
          </>
        )}
      </div>
    </div>
  )
}

export default LoginFormWrapper