import React, { useState } from 'react'
import { initialStudentState } from './InitialStudentState'
import StudentDetails from './StudentDetails'

const StudentForm = ({ addStudent, studentFormRef }) => {
  const [newStudent, setNewStudent] = useState(initialStudentState)
  const [error, setError] = useState(null)

  const handleInputChange = (key, value) => {
    setNewStudent(prevState => {
      const updatedState = { ...prevState, [key]: value }
      
      if (['firstName', 'middleName', 'lastName'].includes(key)) {
        updatedState.name = [
          updatedState.firstName,
          updatedState.middleName,
          updatedState.lastName
        ].filter(Boolean).join(' ')
      }

      updatedState.newPassportNumber = ''
      
      return updatedState
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await addStudent(newStudent)
      setNewStudent(initialStudentState)
      if (studentFormRef.current) {
        studentFormRef.current.toggleVisibility()
      }
    } catch (err) {
      setError('Failed to add student. Please try again.')
      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <div className="student-form">
      <h2>Create a new Student</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <StudentDetails 
          student={newStudent} 
          handleInputChange={handleInputChange} 
          isEditable={true}
        />
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  )
}

export default StudentForm
