const jwt = require('jsonwebtoken')
const studentRouter = require('express').Router()
const Student = require('../models/student')
const User = require('../models/user')

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

  const student = {
    name: body.name,
    passport: body.passport
  }

  Student.findByIdAndUpdate(request.params.id, student, { new: true })
    .then(updatedStudent => {
      response.json(updatedStudent)
    })
    .catch(error => next(error))
})

studentRouter.post('/', async (request, response) => {
  const { name, passport } = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const student = new Student({
    name,
    passport,
    user: user._id
  })

  const savedStudent = await student.save()
  user.students = user.students.concat(savedStudent._id)
  await user.save()

  response.status(201).json(savedStudent)
})

studentRouter.get('/:id', async (request, response) => {
  const student = await Student.findById(request.params.id).populate('student', { name: 1, passport: 1 })
  if (student) {
    response.json(student)
  } else {
    const user = await User.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  }
})

studentRouter.delete('/:id', async (request, response) => {
  await Student.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = studentRouter
