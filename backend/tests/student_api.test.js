const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Student = require('../models/student')

beforeEach(async () => {
  await Student.deleteMany({})
  let studentObject = new Student(helper.initialStudents[0])
  await studentObject.save()
  studentObject = new Student(helper.initialStudents[1])
  await studentObject.save()
})

test('Students are returned as json', async () => {
  await api
    .get('/api/students')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('There are two students', async () => {
  const response = await api.get('/api/students')
  assert.strictEqual(response.body.length, helper.initialStudents.length)
})

test('The first student name is...', async () => {
  const response = await api.get('/api/students')
  const names = response.body.map(e => e.name)
  assert.strictEqual(names.includes('Tony'), true)
})

test('A valid student can be added', async () => {
  const newStudent = {
    name: 'testStudent1',
    passport: 'testPassport1',
  }

  await api
    .post('/api/students')
    .send(newStudent)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await helper.studentsInDb()
  assert.strictEqual(response.length, helper.initialStudents.length + 1)
  const names = response.map(r => r.name)
  assert(names.includes('testStudent1'))
})

test('Student without passport is not added', async () => {
  const newStudent = {
    name: 'John Doe'
  }

  let studentsAtStart = await helper.studentsInDb()

  await api
    .post('/api/students')
    .send(newStudent)
    .expect(400)

  const studentsAtEnd = await helper.studentsInDb()

  assert.strictEqual(studentsAtEnd.length, helper.initialStudents.length)
})

after(async () => {
  await mongoose.connection.close()
})
