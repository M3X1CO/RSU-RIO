const adminRouter = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')

adminRouter.get('/', middleware.authenticateToken, middleware.isAdmin, async (req, res) => {
  const pendingUsers = await User.find({ status: 'pending' })
  res.json(pendingUsers)
})

adminRouter.put('/approve/:id', middleware.authenticateToken, middleware.isAdmin, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true })
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
})

adminRouter.put('/deny/:id', middleware.authenticateToken, middleware.isAdmin, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { status: 'denied' }, { new: true })
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
})

module.exports = adminRouter