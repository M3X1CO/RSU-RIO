const adminRouter = require('express').Router();
const User = require('../models/user');
const middleware = require('../utils/middleware');
const logger = require('../utils/logger');

// Apply auth middleware to all routes
adminRouter.use(middleware.auth);

// Get admin panel (including pending users)
adminRouter.get('/panel', middleware.isAdmin, async (req, res) => {
  try {
    logger.info('Fetching pending users');
    const pendingUsers = await User.find({ status: 'pending' }).select('-passwordHash');
    logger.info(`Found ${pendingUsers.length} pending users`);
    res.json({ message: 'Welcome to the admin panel', pendingUsers });
  } catch (error) {
    logger.error('Error fetching pending users:', error);
    res.status(500).json({ message: 'Error fetching pending users', error: error.message });
  }
});

// Approve a user
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

// Deny a user
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

module.exports = adminRouter;