const adminRouter = require('express').Router();
const User = require('../models/user');
const middleware = require('../utils/middleware');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

adminRouter.use(middleware.auth);

adminRouter.get('/panel', middleware.isAdmin, async (req, res) => {
  try {
    logger.info('Fetching users for admin panel');
    const users = await User.find({}).select('-passwordHash');
    const admins = users.filter(user => user.isAdmin);
    const pendingUsers = users.filter(user => user.status === 'pending');
    const regularUsers = users.filter(user => !user.isAdmin && user.status === 'approved');
    
    logger.info(`Found ${users.length} total users, ${admins.length} admins, ${pendingUsers.length} pending users`);
    res.json({ 
      message: 'Welcome to the admin panel', 
      users: regularUsers, 
      admins, 
      pendingUsers 
    });
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

adminRouter.put('/approve/:id', middleware.isAdmin, async (req, res) => {
  try {
    logger.info(`Approving user with id: ${req.params.id}`);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      logger.warn(`User not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User approved successfully: ${user.username}`);
    res.json({ message: 'User approved successfully', user });
  } catch (error) {
    logger.error('Error approving user:', error);
    res.status(500).json({ message: 'Error approving user', error: error.message });
  }
});

adminRouter.put('/deny/:id', middleware.isAdmin, async (req, res) => {
  try {
    logger.info(`Denying user with id: ${req.params.id}`);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'denied' },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      logger.warn(`User not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User denied successfully: ${user.username}`);
    res.json({ message: 'User denied successfully', user });
  } catch (error) {
    logger.error('Error denying user:', error);
    res.status(500).json({ message: 'Error denying user', error: error.message });
  }
});

adminRouter.put('/makeAdmin/:id', middleware.isAdmin, async (req, res) => {
  try {
    logger.info(`Making user admin with id: ${req.params.id}`);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      logger.warn(`User not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User made admin successfully: ${user.username}`);
    res.json({ message: 'User made admin successfully', user });
  } catch (error) {
    logger.error('Error making user admin:', error);
    res.status(500).json({ message: 'Error making user admin', error: error.message });
  }
});

adminRouter.put('/removeAdmin/:id', middleware.isAdmin, async (req, res) => {
  try {
    logger.info(`Removing admin privileges from user with id: ${req.params.id}`);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: false },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      logger.warn(`User not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`Admin privileges removed successfully from: ${user.username}`);
    res.json({ message: 'Admin privileges removed successfully', user });
  } catch (error) {
    logger.error('Error removing admin privileges:', error);
    res.status(500).json({ message: 'Error removing admin privileges', error: error.message });
  }
});

adminRouter.delete('/user/:id', middleware.isAdmin, async (req, res) => {
  try {
    logger.info(`Deleting user with id: ${req.params.id}`);
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      logger.warn(`User not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User deleted successfully: ${user.username}`);
    res.status(204).end();
  } catch (error) {
    logger.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

adminRouter.post('/register', middleware.isAdmin, async (req, res) => {
  try {
    const { username, password, name } = req.body;

    if (!username || !password) {
      logger.warn('Attempt to register user with missing username or password');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      logger.warn(`Attempt to register user with existing username: ${username}`);
      return res.status(400).json({ error: 'Username must be unique' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
      status: 'approved',
    });

    const savedUser = await user.save();
    logger.info(`New user registered by admin: ${savedUser.username}`);
    res.status(201).json(savedUser);
  } catch (error) {
    logger.error('Error registering new user:', error);
    res.status(500).json({ message: 'Error registering new user', error: error.message });
  }
});

module.exports = adminRouter;