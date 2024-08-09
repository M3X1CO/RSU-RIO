const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config'); 

loginRouter.post('/', async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username });

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'Invalid username or password'
      });
    }

    const userForToken = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET, {
      expiresIn: '1h',
    });

    response.status(200).json({
      token,
      username: user.username,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Login error:', error);
    response.status(500).json({ error: 'An error occurred during login' });
  }
});

module.exports = loginRouter;