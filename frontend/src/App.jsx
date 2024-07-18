import React, { useState, useEffect, useRef } from 'react'
import Student from './components/Student'
import Notification from './components/Notification'
import Footer from './components/Footer'
import studentsService from './services/students'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import StudentForm from './components/StudentForm'

const App = () => {
  const [students, setStudents] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const studentFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedStudentappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      studentsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    studentsService.getAll()
      .then(initialStudents => {
        setStudents(initialStudents)
      })
      .catch(error => {
        console.error('Error fetching students:', error)
        setErrorMessage('Failed to fetch students')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [studentsService])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedStudentappUser', JSON.stringify(user))
      studentsService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addStudent = (studentObject) => {
    studentFormRef.current.toggleVisibility()
    studentsService
      .create(studentObject)
      .then(returnedStudent => {
        setStudents([...students, returnedStudent])
      })
      .catch(error => {
        console.error('Error adding student:', error)
        setErrorMessage('Failed to add student')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm handleSubmit={handleLogin} />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Students</h1>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel='New Student' ref={studentFormRef}>
          <StudentForm createStudent={addStudent} />
        </Togglable>
      </div>}
      <ul>
        {students.map(student => (
          <Student key={student.id} name={student.name} passport={student.passport} />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
