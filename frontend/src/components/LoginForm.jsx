import React, { useState } from 'react';

const LoginForm = ({ handleLogin, handleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegistering) {
      handleRegister(username, password, name);
    } else {
      handleLogin(username, password);
    }
    setUsername('');
    setPassword('');
    setName('');
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter your password"
            required
          />
        </div>
        {isRegistering && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter your name"
              required
            />
          </div>
        )}
        <div className="button-container">
          <button type="submit" className="button login-button">
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <button
            type="button"
            className="button toggle-button"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Back to Login' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;