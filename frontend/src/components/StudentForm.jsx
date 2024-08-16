import React, { useState } from 'react'
import { initialStudentState } from './InitialStudentState'
import StudentDetails from './StudentDetails'
import StudentExists from './StudentExists'
import ErrorMessage from './ErrorMessage'

const StudentForm = ({ addStudent, studentFormRef }) => {
  const [newStudent, setNewStudent] = useState(initialStudentState)
  const [error, setError] = useState(null)

  const handleInputChange = (key, value) => {
    setNewStudent(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const exists = await StudentExists(newStudent.oldPassportNumber, newStudent.newPassportNumber)
      if (exists) {
        setError('A student with this passport number already exists in the database.')
        return
      }

      await addStudent(newStudent)
      setNewStudent(initialStudentState)
      if (studentFormRef.current) {
        studentFormRef.current.toggleVisibility()
      }
    } catch (err) {
      setError('Failed to add student. Please try again.')
    }
    setTimeout(() => setError(null), 5000)
  }

  const handleCancel = () => {
    setNewStudent(initialStudentState)
    if (studentFormRef.current) {
      studentFormRef.current.toggleVisibility()
    }
  }

  return (
    <div className="student-form">
      <h2>Create a new Student</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <StudentDetails 
          student={newStudent} 
          handleInputChange={handleInputChange} 
          isEditable={true}
        />
        <div className="button-container">
          <button type="submit" className="submit-button">Save</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm