import React, { useRef, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginFormWrapper from './components/LoginFormWrapper'
import MainContent from './components/MainContent'
import AdminPage from './components/AdminPanel'
import RestrictedAccess from './components/RestrictedAccess'
import useStudents from './hooks/useStudents'
import useAuth from './hooks/useAuth'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const { user, errorMessage: authError, login, logout, register, isAdmin, loading } = useAuth()
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
  const [view, setView] = useState('main')

  const errorMessage = authError || studentError

  const filteredStudents = students.filter(student =>
    student.oldPassportNumber.toLowerCase().includes(oldPassportSearch.toLowerCase()) &&
    student.newPassportNumber.toLowerCase().includes(newPassportSearch.toLowerCase())
  )

  // Check if the user's status is pending or denied
  const isRestrictedUser = user && (user.status === 'pending' || user.status === 'denied')

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        {loading && <LoadingSpinner />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        
        {!user && <LoginFormWrapper user={user} handleLogin={login} handleRegister={register} />}
        {isRestrictedUser && <RestrictedAccess status={user.status} />}
        {user && !isRestrictedUser && view === 'main' && (
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
        )}
        {user && !isRestrictedUser && isAdmin && view === 'admin' && (
          <AdminPage setView={setView} />
        )}
      </main>

      {user && !isRestrictedUser && (
        <Footer
          addStudent={addStudent}
          user={user}
          logout={logout}
          setView={setView}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default App