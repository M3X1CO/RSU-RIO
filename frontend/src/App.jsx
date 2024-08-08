import React, { useRef, useState } from 'react'
import Notification from './components/Notification'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginFormWrapper from './components/LoginFormWrapper'
import MainContent from './components/MainContent'
import useStudents from './hooks/useStudents'
import useAuth from './hooks/useAuth'

const App = () => {
  const { user, errorMessage: authError, login, logout } = useAuth()
  const { 
    students, 
    errorMessage: studentError, 
    addStudent, 
    deleteStudent, 
    updateStudent 
  } = useStudents(user)
  const studentFormRef = useRef()
  const [oldPassportSearch, setOldPassportSearch] = useState('')
  const [newPassportSearch, setNewPassportSearch] = useState('')

  const errorMessage = authError || studentError

  const filteredStudents = students.filter(student =>
    student.oldPassportNumber.toLowerCase().includes(oldPassportSearch.toLowerCase()) &&
    student.newPassportNumber.toLowerCase().includes(newPassportSearch.toLowerCase())
  )

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
          students={filteredStudents}
          deleteStudent={deleteStudent}
          updateStudent={updateStudent}
          oldPassportSearch={oldPassportSearch}
          newPassportSearch={newPassportSearch}
          setOldPassportSearch={setOldPassportSearch}
          setNewPassportSearch={setNewPassportSearch}
        />
      }
      <Footer addStudent={addStudent} />
    </div>
  )
}

export default App