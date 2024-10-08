import React, { useState } from 'react';

const RegisterUser = ({ handleRegister }) => {
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
        <div className="register-button-container">
          <button type="submit" className="button register-button">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;