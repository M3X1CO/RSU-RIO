const studentRouter = require('express').Router()
const Student = require('../models/student')
const validateObjectId = require('../utils/middleware').validateObjectId

studentRouter.get('/', async (request, response) => {
  const students = await Student
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(students)
})

studentRouter.get('/:id', validateObjectId, async (request, response) => {
  const student = await Student
  .findById(request.params.id)
  .populate('user', { username: 1, name: 1 })
  if (!student) {
    return response.status(404).send('Student not found')
  }
  response.json(student)
})

studentRouter.post('/', async (request, response) => {
  const { name, passport } = request.body
  const user = request.user

  const student = new Student({
    name: name,
    passport: passport,
    user: user.id
  })
  const savedStudent = await student.save()
  user.students = user.students.concat(savedStudent._id)
  await user.save()

  response.status(201).json(savedStudent)
})

studentRouter.delete('/:id', validateObjectId, async (request, response) => {
  const result = await Student.findByIdAndDelete(request.params.id)
  if (!result) {
    return response.status(404).send('Student not found')
  }
  response.status(204).end()
})

studentRouter.put('/:id', validateObjectId, async (request, response) => {
  const body = request.body

  const student = {
    name: body.name,
    passport: body.passport
  }

  const updatedStudent = await Student.findByIdAndUpdate(request.params.id, student, { new: true })

  if (!updatedStudent) {
    return response.status(404).send('Student not found')
  }
  response.json(updatedStudent)
})

module.exports = studentRouter
