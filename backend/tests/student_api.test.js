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

  for (let student of helper.initialStudents) {
    let studentObject = new Student(student)
    await studentObject.save()
  }
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

test('A specific student can be viewed', async () => {
  const studentsAtStart = await helper.studentsInDb()

  const studentToView = studentsAtStart[0]


  const resultStudent = await api
    .get(`/api/students/${studentToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultStudent.body, studentToView)
})

test('A student can be deleted', async () => {
  const studentsAtStart = await helper.studentsInDb()
  const studentToDelete = studentsAtStart[0]


  await api
    .delete(`/api/students/${studentToDelete.id}`)
    .expect(204)

  const studentsAtEnd = await helper.studentsInDb()

  const names = studentsAtEnd.map(r => r.name)
  assert(!names.includes(studentToDelete.name))

  assert.strictEqual(studentsAtEnd.length, helper.initialStudents.length - 1)
})

test('Students are returned as json and have an id property instead of _id', async () => {
  const response = await api
      .get('/api/students')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  const student = response.body[0]
  assert(student.id, 'The student should have an id property')
  assert.strictEqual(student._id, undefined, 'The student should not have an _id property')
})

test('Student without passport property defaults to 0', async () => {
  const newStudent = {
    name: 'testStudent',
  }

  await api
    .post('/api/students')
    .send(newStudent)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await helper.studentsInDb()

  console.log('Response from studentsInDb:', response);

  const addedStudent = response.find(student => student.name === 'testStudent')
  console.log('Added student:', addedStudent);

  assert.strictEqual(addedStudent.passport, '0', 'The passport property should default to 0')
})

after(async () => {
  await mongoose.connection.close()
})
