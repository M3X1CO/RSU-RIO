const studentRouter = require('express').Router()
const Student = require('../models/student')

studentRouter.get('/', (request, response) => {
  Student.find({})
    .then(students => {
      response.json(students)
    })
    .catch(error => next(error))
})

studentRouter.get('/:id', (request, response, next) => {
  Student.findById(request.params.id)
    .then(student => {
      if (student) {
        response.json(student)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

studentRouter.post('/', (request, response, next) => {
  const body = request.body

  const student = new Student({
    name: body.name,
    passport: body.passport,
  })

  student.save()
    .then(savedStudent => {
      response.json(savedStudent)
    })
    .catch(error => next(error))
})

studentRouter.delete('/:id', (request, response, next) => {
  Student.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

studentRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const student = {
    name: body.name,
    age: body.age,
    email: body.email,
  }

  Student.findByIdAndUpdate(request.params.id, student, { new: true })
    .then(updatedStudent => {
      response.json(updatedStudent)
    })
    .catch(error => next(error))
})

module.exports = studentRouter
