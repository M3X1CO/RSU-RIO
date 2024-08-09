import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterUser from './RegisterUser'

const LoginFormWrapper = ({ handleLogin, handleRegister }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)

  const showLoginForm = () => {
    setLoginVisible(true)
    setRegisterVisible(false)
  }

  const showRegisterForm = () => {
    setRegisterVisible(true)
    setLoginVisible(false)
  }

  const hideForm = () => {
    setLoginVisible(false)
    setRegisterVisible(false)
  }

  return (
    <div className="form-container">
      {!loginVisible && !registerVisible ? (
        <div className="button-group">
          <button onClick={showLoginForm} className="button login-button standalone">Log In</button>
          <button onClick={showRegisterForm} className="button register-button standalone">Register</button>
        </div>
      ) : loginVisible ? (
        <div className="login-form-wrapper">
          <LoginForm handleSubmit={handleLogin} />
          <button onClick={hideForm} className="button cancel-button">Cancel</button>
        </div>
      ) : (
        <div className="register-form-wrapper">
          <RegisterUser handleRegister={handleRegister} setView={hideForm} />
          <button onClick={hideForm} className="button cancel-button">Cancel</button>
        </div>
      )}
    </div>
  )
}

export default LoginFormWrapper