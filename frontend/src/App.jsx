import { useState, useEffect, useRef } from 'react'
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
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    studentsService
    .getAll()
    .then(initialStudents => {
      setStudents(initialStudents)
    })
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedStudentappUser', JSON.stringify(user))
      studentsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
        setStudents(student.concat(returnedStudent))
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

  return (
    <div>
      <h1>Students</h1>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel='New Student' ref={studentFormRef}>
          <StudentForm
            createStudent={addStudent}
          />
        </Togglable>
      </div>}
      <ul>
        {students.map(student => (
          <Student key={student.id} student={student} />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
