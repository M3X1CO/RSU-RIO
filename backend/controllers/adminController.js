const User = require('../models/user');

exports.getAdminPanel = async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      const pendingUsers = await User.find({ status: 'pending' });
      res.json({ message: 'Welcome to the admin panel', pendingUsers });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching pending users', error: error.message });
    }
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

exports.approveUser = async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User approved successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error approving user', error: error.message });
    }
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

exports.denyUser = async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { status: 'denied' }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User denied successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error denying user', error: error.message });
    }
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};