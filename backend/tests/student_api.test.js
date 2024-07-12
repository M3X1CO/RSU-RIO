const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const helper = require('./test_helper')

const Student = require('../models/student')
const User = require('../models/user')

describe('When there is initially some students saved', () => {
  let token = ''

  beforeEach(async () => {
    await User.deleteMany({})
    await Student.insertMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'testuser', name: 'testuser', passwordHash })
    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

    const students = helper.initialStudents.map(student => ({ ...student, user: user._id }))
    await Student.insertMany(students)
  })

  test('Students are returned as json', async () => {
    await api
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // test('Students are returned as json and have an id property instead of _id', async () => {
  //   const response = await api
  //     .get('/api/students')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/)

  //   const student = response.body[0]
  //   assert(student.id, 'The student should have an id property')
  //   assert.strictEqual(student._id, undefined, 'The student should not have an _id property')
  // })

  // test('There are two students', async () => {
  //   const response = await helper.studentsInDb()
  //   assert.strictEqual(response.length, helper.initialStudents.length)
  // })

  // test('The first student name is...', async () => {
  //   const response = await helper.studentsInDb()
  //   const names = response.body.map(e => e.name)
  //   assert.strictEqual(names.includes('Tony'), true)
  // })

  // describe('Viewing a specific student', () => {
  //   test('A specific student can be viewed', async () => {
  //     const studentsAtStart = await helper.studentsInDb()
  //     const studentToView = studentsAtStart[0]

  //     const resultStudent = await api
  //       .get(`/api/students/${studentToView.id}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)

  //     const resultStudentBody = {
  //       ...resultStudent.body,
  //       user: studentToView.user.toString()
  //     }

  //     const expectedStudent = {
  //       ...studentToView,
  //       user: studentToView.user.toString()
  //     }

  //     assert.deepStrictEqual(resultStudentBody, expectedStudent)
  //   })

  //   test('Fails with statuscode 404 if student does not exist', async () => {
  //     const validNonexistingId = await helper.nonExistingId()

  //     await api
  //       .get(`/api/students/${validNonexistingId}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .expect(404)
  //   })

  //   test('Fails with statuscode 400 id is invalid', async () => {
  //     const invalidId = '5a3d5da59070081a82a3445'

  //     await api
  //       .get(`/api/students/${invalidId}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .expect(400)
  //   })
  // })

  // describe('Addition of a new student', () => {
  //   test('A valid student can be added', async () => {
  //     const newStudent = {
  //       name: 'testStudent1',
  //       passport: 'testPassport1',
  //     }

  //     await api
  //       .post('/api/students')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(newStudent)
  //       .expect(201)
  //       .expect('Content-Type', /application\/json/)

  //     const response = await helper.studentsInDb()
  //     assert.strictEqual(response.length, helper.initialStudents.length + 1)

  //     const names = response.map(r => r.name)
  //     assert(names.includes('testStudent1'))
  //   })

  //   test('Student without passport property defaults to 0', async () => {
  //     const newStudent = {
  //       name: 'testStudent',
  //     }

  //     await api
  //       .post('/api/students')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(newStudent)
  //       .expect(201)
  //       .expect('Content-Type', /application\/json/)

  //     const response = await helper.studentsInDb()
  //     const addedStudent = response.find(student => student.name === 'testStudent')

  //     assert.strictEqual(addedStudent.passport, '0', 'The passport property should default to 0')
  //   })
  // })

  // describe('Deletion of a student', () => {
  //   test('A student can be deleted', async () => {
  //     const studentsAtStart = await helper.studentsInDb()
  //     const studentToDelete = studentsAtStart[0]


  //     await api
  //       .delete(`/api/students/${studentToDelete.id}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .expect(204)

  //     const studentsAtEnd = await helper.studentsInDb()

  //     const names = studentsAtEnd.map(r => r.name)
  //     assert(!names.includes(studentToDelete.name))

  //     assert.strictEqual(studentsAtEnd.length, helper.initialStudents.length - 1)
  //   })
  // })

  // describe('when there is initially one user at db', () => {
  //   beforeEach(async () => {
  //     await User.deleteMany({})

  //     const passwordHash = await bcrypt.hash('sekret', 10)
  //     const user = new User({ username: 'root', passwordHash })
  //     await user.save()

  //     const userForToken = {
  //       username: user.username,
  //       id: user._id,
  //     }
  //     token = jwt.sign(userForToken, process.env.SECRET, { expires: 60*60 })
  //   })

  //   test('creation succeeds with a fresh username', async () => {
  //     const usersAtStart = await helper.usersInDb()

  //     const newUser = {
  //       username: 'mluukkai',
  //       name: 'Matti Luukkainen',
  //       password: 'salainen',
  //     }

  //     await api
  //       .post('/api/users')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(newUser)
  //       .expect(201)
  //       .expect('Content-Type', /application\/json/)

  //     const usersAtEnd = await helper.usersInDb()
  //     assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  //     const usernames = usersAtEnd.map(u => u.username)
  //     assert(usernames.includes(newUser.username))
  //   })

  //   test('creation fails with proper statuscode and message if username already taken', async () => {
  //     const usersAtStart = await helper.usersInDb()

  //     const newUser = {
  //       username: 'root',
  //       name: 'Superuser',
  //       password: 'salainen',
  //     }

  //     const result = await api
  //       .post('/api/users')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(newUser)
  //       .expect(400)
  //       .expect('Content-Type', /application\/json/)

  //     const usersAtEnd = await helper.usersInDb()

  //     assert(result.body.error.includes('expected `username` to be unique'))

  //     assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  //   })

  //   test('creation fails with proper statuscode and message if username or password is too short', async () => {
  //     const newUser = {
  //       username: 'us',
  //       name: 'New User',
  //       password: 'pw',
  //     }

  //     const result = await api
  //       .post('/api/users')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send(newUser)
  //       .expect(400)
  //       .expect('Content-Type', /application\/json/)

  //     assert(result.body.error.includes('username and password must be at least 3 characters long'))

  //     const users = await User.find({})
  //     assert.strictEqual(users.length, 1) 
  //   })
  // })
})

after(async () => {
  await mongoose.connection.close()
})
