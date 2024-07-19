import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-form">
      <h2>Login</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="centered-button-container">
          <button type="submit" className="login-button">login</button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
