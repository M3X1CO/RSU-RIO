import React, { useState } from 'react'
import StudentDetails from './StudentDetails'
import EditStudent from './EditStudent'

const Student = ({ student, handleDelete, handleUpdate }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const toggleDetails = () => setShowDetails(!showDetails)

  const confirmDelete = () => {
    handleDelete(student.id)
  }

  const startEditing = () => {
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
  }

  const handleStudentUpdate = async (updatedStudent) => {
    try {
      await handleUpdate(updatedStudent)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }

  if (isEditing) {
    return (
      <EditStudent 
        student={student} 
        handleUpdate={handleStudentUpdate} 
        handleCancel={cancelEditing} 
      />
    )
  }

  return (
    <li className='student'>
      <div className='student-content'>
        <div className='student-info'>
          <div><strong>Name:</strong> {student.name}</div>
          <div><strong>Old Passport Number:</strong> {student.oldPassportNumber}</div>
          <div><strong>New Passport Number:</strong> {student.newPassportNumber}</div>
        </div>
        <div className='button-container'>
          <button onClick={toggleDetails}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button onClick={startEditing}>Edit</button>
          <button onClick={confirmDelete} className="delete-button">Delete</button>
        </div>
      </div>
      {showDetails && <StudentDetails student={student} />}
    </li>
  )
}

export default Student