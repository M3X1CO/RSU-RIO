import React, { useRef } from 'react'
import Notification from './components/Notification'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginFormWrapper from './components/LoginFormWrapper'
import MainContent from './components/MainContent'
import useStudents from './hooks/useStudents'
import useAuth from './hooks/useAuth'

const App = () => {
  const { user, errorMessage: authError, login, logout } = useAuth()
  const { students, errorMessage: studentError, addStudent, deleteStudent } = useStudents(user)
  const studentFormRef = useRef()

  const errorMessage = authError || studentError

  return (
    <div>
      <Header user={user} logout={logout} />

      <Notification message={errorMessage} />

      {!user && <LoginFormWrapper handleLogin={login} />}
      {user && 
        <MainContent 
          user={user}
          studentFormRef={studentFormRef}
          addStudent={addStudent}
          students={students}
          deleteStudent={deleteStudent}
        />
      }
      <Footer addStudent={addStudent} />
    </div>
  )
}

export default App