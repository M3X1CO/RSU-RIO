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
  const student = await Student.findById(request.params.id)
  if (!student) {
    return response.status(404).send('Student not found')
  }
  response.json(student)
})

studentRouter.post('/', async (request, response, next) => {
  const body = request.body

  const student = new Student({
    name: body.name,
    passport: body.passport,
  })
  const savedStudent = await student.save()
  response.status(201).json(savedStudent)
})

studentRouter.delete('/:id', validateObjectId, async (request, response, next) => {
  const result = await Student.findByIdAndDelete(request.params.id)
  if (!result) {
    return response.status(404).send('Student not found')
  }
  response.status(204).end()
})

studentRouter.put('/:id', validateObjectId, async (request, response, next) => {
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
