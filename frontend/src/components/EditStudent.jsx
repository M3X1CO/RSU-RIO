import React, { useState } from 'react'
import StudentDetails from './StudentDetails'

const EditStudent = ({ student, handleUpdate, handleCancel }) => {
  const [editedStudent, setEditedStudent] = useState(student)

  const handleInputChange = (key, value) => {
    setEditedStudent(prevStudent => ({
      ...prevStudent,
      [key]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleUpdate(editedStudent)
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <StudentDetails 
        student={editedStudent} 
        handleInputChange={handleInputChange}
        isEditable={true}
      />
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default EditStudent