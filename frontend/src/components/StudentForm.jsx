import React, { useState } from 'react'
import { initialStudentState } from './initialStudentState'
import StudentFields from './StudentFields'

const StudentForm = ({ createStudent }) => {
  const [newStudent, setNewStudent] = useState(initialStudentState)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewStudent(prevState => {
      const updatedState = { ...prevState, [name]: value }
      
      // Combine name fields whenever first, middle, or last name changes
      if (['firstName', 'middleName', 'lastName'].includes(name)) {
        updatedState.name = [
          updatedState.firstName,
          updatedState.middleName,
          updatedState.lastName
        ].filter(Boolean).join(' ')
      }
      
      return updatedState
    })
  }

  const addStudent = (event) => {
    event.preventDefault()
    createStudent(newStudent)
    setNewStudent(initialStudentState)
  }

  return (
    <div className="student-form">
      <h2>Create a new Student</h2>

      <form onSubmit={addStudent}>
        <StudentFields 
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