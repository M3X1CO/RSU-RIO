import React, { useState } from 'react'

const Student = ({ student, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => setShowDetails(!showDetails)

  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      handleDelete(student.id)
    }
  }

  return (
    <li className='student'>
      <p>
        <strong>Student's Name: </strong> 
        <span style={{ color: 'green' }}>{student.name}<br/></span> 
        <strong>Student's Passport Number: </strong> 
        <span style={{ color: 'green' }}>{student.passport}</span>
      </p>
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div>
          <p>Additional details about the student</p>
          <p>Created by: {student.user.name}</p>
        </div>
      )}
      <button onClick={confirmDelete} className="delete-button">Delete</button>
    </li>
  )
}

export default Student
