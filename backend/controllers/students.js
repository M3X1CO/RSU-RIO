const jwt = require('jsonwebtoken')
const studentRouter = require('express').Router()
const Student = require('../models/student')
const User = require('../models/user')
const studentFields = require('../utils/studentFields')
const config = require('../utils/config')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

studentRouter.post('/check-exists', async (request, response) => {
  const { oldPassportNumber, newPassportNumber } = request.body;

  const query = {
    $or: []
  };

  if (oldPassportNumber) {
    query.$or.push({ oldPassportNumber: oldPassportNumber });
  }

  if (newPassportNumber) {
    query.$or.push({ newPassportNumber: newPassportNumber });
  }

  if (query.$or.length === 0) {
    return response.json({ exists: false });
  }

  const existingStudent = await Student.findOne(query);

  response.json({ exists: !!existingStudent });
});

studentRouter.get('/verify-token', async (request, response) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, config.JWT_SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'user not found' })
    }
    response.status(200).json({ message: 'Token is valid' })
  } catch (error) {
    console.error('Token verification error:', error)
    response.status(401).json({ error: 'token invalid' })
  }
})

studentRouter.get('/', async (request, response) => {
  const students = await Student.find({}).populate('user', { username: 1, name: 1 })
  response.json(students)
})

studentRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const student = {}
  Object.keys(studentFields).forEach(field => {
    if (body[field] !== undefined) {
      student[field] = body[field]
    }
  })

  Student.findByIdAndUpdate(request.params.id, student, { new: true })
    .then(updatedStudent => {
      response.json(updatedStudent)
    })
    .catch(error => next(error))
})

studentRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  
  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const student = new Student({
      ...Object.keys(studentFields).reduce((acc, field) => {
        if (body[field] !== undefined) {
          acc[field] = body[field]
        }
        return acc
      }, {}),
      user: user._id
    })

    const savedStudent = await student.save()
    user.students = user.students.concat(savedStudent._id)
    await user.save()

    response.status(201).json(savedStudent)
  } catch (error) {
    console.error('Error in student creation:', error)
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' })
    }
    response.status(500).json({ error: 'internal server error' })
  }
})

studentRouter.get('/:id', async (request, response) => {
  const student = await Student.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (student) {
    response.json(student)
  } else {
    response.status(404).end()
  }
})

studentRouter.delete('/:id', async (request, response) => {
  await Student.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = studentRouter