const jwt = require('jsonwebtoken')
const config = require('./config')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const auth = (req, res, next) => {
  const authHeader = req.get('authorization')
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    const token = authHeader.substring(7)
    try {
      const decodedToken = jwt.verify(token, config.SECRET)
      req.user = decodedToken
      next()
    } catch (error) {
      logger.error('Token verification failed:', error.message)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(403).json({ error: 'Access denied' })
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    logger.error('Error: Malformatted id:', error.message)
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    logger.error('Validation Error:', error.message)
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    logger.error('MongoDB Duplicate Key Error:', error.message)
    return response.status(400).json({ error: 'Expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    logger.error('JWT Error:', error.message)
    return response.status(401).json({ error: 'Invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    logger.error('JWT Token Expired:', error.message)
    return response.status(401).json({ error: 'Token expired' })
  }

  logger.error('Internal Server Error:', error.message)
  next(error)
}

module.exports = {
  requestLogger,
  auth,
  isAdmin,
  unknownEndpoint,
  errorHandler
}