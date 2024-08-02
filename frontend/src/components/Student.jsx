import React, { useState } from 'react'
import StudentFields from './StudentFields'

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
        <span style={{ color: 'green' }}>{student.originalPassportNumber}</span>
      </p>
      <button onClick={toggleDetails} className="toggle-details-button">
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="student-details">
          <h3>Student Details</h3>
          <StudentFields student={student} />
        </div>
      )}
      <button onClick={confirmDelete} className="delete-button">Delete</button>
    </li>
  )
}

export default Student