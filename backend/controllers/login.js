const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // Validate username and password presence
  if (!username || !password) {
    return response.status(400).json({ error: 'Username or password missing' })
  }

  const user = await User.findOne({ username })

  // Check if user exists and password is correct
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  // Prepare user information for token
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // Generate token with user information
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  )

  console.log('Generated token:', token)

  // Return token and user information
  response
    .status(200)
    .json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
