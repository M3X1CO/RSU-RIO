const adminRouter = require('express').Router();
const User = require('../models/user');
const middleware = require('../utils/middleware');

// Get all pending users
adminRouter.get('/', middleware.auth, middleware.isAdmin, async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' });
    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pending users' });
  }
});

// Approve a user
adminRouter.put('/approve/:id', middleware.auth, middleware.isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error approving user' });
  }
});

// Deny a user
adminRouter.put('/deny/:id', middleware.auth, middleware.isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'denied' }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error denying user' });
  }
});

module.exports = adminRouter;