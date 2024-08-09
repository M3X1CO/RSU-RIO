import React, { useRef, useState } from 'react'
import Notification from './components/Notification'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginFormWrapper from './components/LoginFormWrapper'
import MainContent from './components/MainContent'
import AdminPage from './components/AdminPanel'
import AdminPanel from './components/AdminPanel'
import useStudents from './hooks/useStudents'
import useAuth from './hooks/useAuth'

const App = () => {
  const { user, errorMessage: authError, login, logout, isAdmin, loading } = useAuth()
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

  return (
    <div className="app-container">
      <Header />
      <Notification message={errorMessage} />

      <main className="main-content">
        {!user && <LoginFormWrapper handleLogin={login} />}
        {user && view === 'main' && (
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
        {user && isAdmin && view === 'admin' && (
          <AdminPage user={user} />
        )}
        {loading && <LoadingSpinner />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {isAdmin && <AdminPanel />}
      </main>

      <Footer
        addStudent={addStudent}
        user={user}
        logout={logout}
        setView={setView}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default App