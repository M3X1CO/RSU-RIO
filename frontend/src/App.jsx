import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import studentsService from './services/students'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import StudentForm from './components/StudentForm'

const App = () => {
  const [students, setStudents] = useState([])
  const [newName, setNewName] = useState('')
  const [newPassportNumber, setNewPassportNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedStudentappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      studentsService.setToken(user.token)
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    studentsService
      .getAll()
      .then(initialStudents => {
        setStudents(initialStudents)
      })
      .catch(error => {
        console.error('Failed to fetch students', error)
      })
  }, [])

  const addStudent = async (event) => {
    event.preventDefault()

    const studentExists = students.find((student) => student.passport === newPassportNumber)

    if (studentExists) {
      setErrorMessage(`Student with Passport Number ${newPassportNumber} already exists`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
      return
    }

    const studentObject = {
      name: newName,
      passport: newPassportNumber,
    }

    try {
      const returnedStudent = await studentsService.create(studentObject)
      setStudents(students.concat(returnedStudent))
      setNewName('')
      setNewPassportNumber('')
    } catch (error) {
      setErrorMessage('Error adding Student')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePassportChange = (event) => setNewPassportNumber(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedStudentappUser', JSON.stringify(user))
      studentsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setIsLoggedIn(true)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const studentsToShow = students

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const studentForm = () => (
    <form onSubmit={addStudent}>
      <div>
        <label>Name</label>
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Passport Number</label>
        <input
          value={newPassportNumber}
          onChange={handlePassportChange}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Students</h1>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="New Student">
            {studentForm()}
          </Togglable>
        </div>
      )}
      <ul>
        {studentsToShow.map(student => (
          <li key={student.id}>
            {student.name} by {student.passport}
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
