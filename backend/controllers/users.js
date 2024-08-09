const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password, isAdmin = false } = request.body

  if (!username || !password || username.length < 6 || password.length < 6) {
    return response.status(400).json({ error: 'Username and password must be at least 6 characters long' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'Username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    isAdmin,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('students', { firstName: 1, originalPassportNumber: 1 })

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
  .findById(request.params.id)
  .populate('students', { firstName: 1, originalPassportNumber: 1 })

  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  response.json(user);
});

usersRouter.put('/:id', async (request, response) => {
  const { username, name, password, isAdmin, status } = request.body;
  const userId = request.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  if (isAdmin !== undefined) {
    user.isAdmin = isAdmin;
  }

  if (status !== undefined) {
    user.status = status;
  }

  if (username) {
    user.username = username;
  }

  if (name) {
    user.name = name;
  }

  if (password) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    user.passwordHash = passwordHash;
  }

  const updatedUser = await user.save();
  response.json(updatedUser);
})

module.exports = usersRouter