const express = require('express')
const mongoose = require('mongoose')
const studentRouter = express.Router()
const Student = require('../models/student')

// Middleware for validating object IDs
const validateObjectId = (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID')
  }
  next()
}

studentRouter.get('/', async (request, response, next) => {
  const students = await Student.find({})
  response.json(students)
})

studentRouter.get('/:id', validateObjectId, async (request, response, next) => {
  try {
    const student = await Student.findById(request.params.id)
    if (!student) {
      return response.status(404).send('Student not found')
    }
    response.json(student)
  } catch (error) {
    next(error)
  }
})

studentRouter.post('/', async (request, response, next) => {
  const body = request.body

  const student = new Student({
    name: body.name,
    passport: body.passport,
  })
  try {
    const savedStudent = await student.save()
    response.status(201).json(savedStudent)
  } catch(error) {
    next(error)
  }
})

studentRouter.delete('/:id', validateObjectId, (request, response, next) => {
  Student.findByIdAndDelete(request.params.id)
    .then(result => {
      if (!result) {
        return response.status(404).send('Student not found')
      }
      response.status(204).end()
    })
    .catch(error => next(error))
})

studentRouter.put('/:id', validateObjectId, (request, response, next) => {
  const body = request.body

  const student = {
    name: body.name,
    passport: body.passport
  }

  Student.findByIdAndUpdate(request.params.id, student, { new: true })
    .then(updatedStudent => {
      if (!updatedStudent) {
        return response.status(404).send('Student not found')
      }
      response.json(updatedStudent)
    })
    .catch(error => next(error))
})

module.exports = studentRouter
