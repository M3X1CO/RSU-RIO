const jwt = require('jsonwebtoken')
const studentRouter = require('express').Router()
const Student = require('../models/student')
const User = require('../models/user')
const studentFields = require('../utils/studentFields')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

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
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
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