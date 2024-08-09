const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// Create a new user
usersRouter.post('/', async (request, response) => {
  try {
    const { username, name, password, isAdmin = false } = request.body;

    // Validate input
    if (!username || !password || username.length < 6 || password.length < 6) {
      return response.status(400).json({ error: 'Username and password must be at least 6 characters long' });
    }

    // Check if the username is unique
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ error: 'Username must be unique' });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({
      username,
      name,
      passwordHash,
      isAdmin,
      status: 'pending',
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({})
      .populate('students', { firstName: 1, originalPassportNumber: 1 })
      .select({ passwordHash: 0 });

    response.json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single user
usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User
      .findById(request.params.id)
      .populate('students', { firstName: 1, originalPassportNumber: 1 })
      .select({ passwordHash: 0 });

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user
usersRouter.put('/:id', async (request, response) => {
  try {
    const { username, name, password, isAdmin, status } = request.body;
    const userId = request.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Update the user fields
    user.username = username || user.username;
    user.name = name || user.name;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;
    user.status = status || user.status;

    // Update the password if provided
    if (password) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      user.passwordHash = passwordHash;
    }

    const updatedUser = await user.save();
    response.json(updatedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = usersRouter;