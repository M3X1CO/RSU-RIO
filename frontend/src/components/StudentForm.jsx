import React, { useState } from 'react'
import { initialStudentState } from './InitialStudentState'
import StudentDetails from './StudentDetails'

const StudentForm = ({ addStudent, studentFormRef }) => {
  const [newStudent, setNewStudent] = useState(initialStudentState)

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
      
      return updatedState
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addStudent(newStudent)
    setNewStudent(initialStudentState)
    studentFormRef.current.toggleVisibility()
  }

  return (
    <div className="student-form">
      <h2>Create a new Student</h2>

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
