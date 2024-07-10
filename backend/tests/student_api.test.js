const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Student = require('../models/student')

describe('When there is initially some notes saved', () => {
  beforeEach(async () => {
    await Student.deleteMany({})
    await Student.insertMany(helper.initialStudents)
  })

  test('Students are returned as json', async () => {
    await api
      .get('/api/students')
      .expect(200)
      .expect('Content-Type', /application\/json/)
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

  test('There are two students', async () => {
    const response = await api.get('/api/students')
    assert.strictEqual(response.body.length, helper.initialStudents.length)
  })

  test('The first student name is...', async () => {
    const response = await api.get('/api/students')
    const names = response.body.map(e => e.name)
    assert.strictEqual(names.includes('Tony'), true)
  })

  describe('Viewing a specific student', () => {
    test('A specific student can be viewed', async () => {
      const studentsAtStart = await helper.studentsInDb()

      const studentToView = studentsAtStart[0]


      const resultStudent = await api
        .get(`/api/students/${studentToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultStudent.body, studentToView)
    })

    test('Fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/students/${validNonexistingId}`)
        .expect(404)
    })

    test('Fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/students/${invalidId}`)
        .expect(400)
    })
  })

  describe('Addition of a new student', () => {
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

      // console.log('Response from studentsInDb:', response);

      const addedStudent = response.find(student => student.name === 'testStudent')
      // console.log('Added student:', addedStudent);

      assert.strictEqual(addedStudent.passport, '0', 'The passport property should default to 0')
    })
  })

  describe('Deletion of a student', () => {
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

  })
})

after(async () => {
  await mongoose.connection.close()
})
