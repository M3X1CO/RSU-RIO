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
      <p>
        <span className='label'>Student's Name: </span>
        <span className='student-render'>{student.name}<br/></span>
        <span className='label'>Student's Original Passport Number: </span>
        <span className='student-render'>{student.oldPassportNumber}<br/></span>
        <span className='label'>Student's New Passport Number: </span>
        <span className='student-render'>{student.newPassportNumber}</span>
      </p>
      <button onClick={toggleDetails} className="button-spacing">
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <StudentDetails student={student} />}
      <button onClick={startEditing} className="button-spacing">Edit</button>
      <button onClick={confirmDelete} className="button-spacing">Delete</button>
    </li>
  )
}

export default Student