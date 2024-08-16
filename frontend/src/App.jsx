import React, { useRef, useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import MainContent from './components/MainContent'
import AdminPage from './components/AdminPanel'
import RestrictedAccess from './components/RestrictedAccess'
import useStudents from './hooks/useStudents'
import useAuth from './hooks/useAuth'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const { 
    user, 
    errorMessage: authError, 
    login, 
    logout, 
    register, 
    isAdmin, 
    loading: authLoading, 
    status 
  } = useAuth()

  const {
    students,
    errorMessage: studentError,
    loading: studentsLoading,
    addStudent: addStudentHook,
    deleteStudent,
    updateStudent,
    refreshStudents
  } = useStudents(user)

  const addStudent = (studentObject) => {
    return addStudentHook(studentObject, user)
  }

  const studentFormRef = useRef()
  const [oldPassportSearch, setOldPassportSearch] = useState('')
  const [newPassportSearch, setNewPassportSearch] = useState('')
  const [view, setView] = useState('main')

  const errorMessage = authError || studentError

  useEffect(() => {
    if (user) {
      refreshStudents()
    }
  }, [user, refreshStudents])

  const handleLogin = async (username, password) => {
    try {
      await login(username, password)
      refreshStudents()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = () => {
    logout()
    setView('main')
  }

  const filteredStudents = students.filter(student =>
    student.oldPassportNumber.toLowerCase().includes(oldPassportSearch.toLowerCase()) &&
    student.newPassportNumber.toLowerCase().includes(newPassportSearch.toLowerCase())
  )

  const renderContent = () => {
    if (authLoading || studentsLoading) return <LoadingSpinner />

    if (errorMessage) return <ErrorMessage message={errorMessage} />

    if (!user) {
      return <LoginForm handleLogin={handleLogin} handleRegister={register} />
    }

    if (!status || status !== 'approved') {
      return <RestrictedAccess status={status || 'unknown'} logout={handleLogout} />
    }

    if (view === 'main') {
      return (
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
      )
    }

    if (isAdmin && view === 'admin') {
      return <AdminPage setView={setView} />
    }

    return null
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {renderContent()}
      </main>
      {user && status === 'approved' && (
        <Footer
          addStudent={addStudent}
          user={user}
          logout={handleLogout}
          setView={setView}
          isAdmin={isAdmin}
          refreshStudents={refreshStudents}
        />
      )}
    </div>
  )
}

export default App