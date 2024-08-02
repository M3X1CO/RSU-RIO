import React, { useState } from 'react'
import { initialStudentState } from './initialStudentState'
import StudentFields from './StudentFields'

const StudentForm = ({ createStudent }) => {
  const [newStudent, setNewStudent] = useState(initialStudentState)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewStudent({
      ...newStudent,
      [name]: value
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