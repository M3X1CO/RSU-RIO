import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RegisterUser = ({ user, handleRegister, setView }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister(username, password, name);
    setUsername('');
    setPassword('');
    setName('');
  };

  return (
    <div className="register-form">
      <h2>Register New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="register-username">Username:</label>
          <input
            id="register-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password:</label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-name">Name:</label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Enter your name"
            required
          />
        </div>
      </form>
    </div>
  );
};

RegisterUser.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  user: PropTypes.object,
  setView: PropTypes.func.isRequired,
};

export default RegisterUser;