const adminRouter = require('express').Router();
const User = require('../models/user');
const middleware = require('../utils/middleware');

adminRouter.use(middleware.auth)

// Get admin panel (including pending users)
adminRouter.get('/', middleware.auth, middleware.isAdmin, async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' });
    res.json({ message: 'Welcome to the admin panel', pendingUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending users', error: error.message });
  }
});

// Approve a user
adminRouter.put('/approve/:id', middleware.auth, middleware.isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User approved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error approving user', error: error.message });
  }
});

// Deny a user
adminRouter.put('/deny/:id', middleware.auth, middleware.isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'denied' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User denied successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error denying user', error: error.message });
  }
});

module.exports = adminRouter;