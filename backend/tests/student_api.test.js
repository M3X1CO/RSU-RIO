const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const Student = require('../models/student')
const User = require('../models/user')

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

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(result.body.error.includes('expected `username` to be unique'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
