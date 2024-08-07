import React, { useState } from 'react'
import StudentDetails from './StudentDetails'
import '../index.css'

const Student = ({ student, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => setShowDetails(!showDetails)

  return (
    <li className='student'>
      <p>
        <span className='label'>Student's Name: </span>
        <span className='student-name'>{student.name}<br/></span>
        <span className='label'>Student's Passport Number: </span>
        <span className='student-passport'>{student.originalPassportNumber}</span>
      </p>
      <button onClick={toggleDetails} className="toggle-details-button">
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <StudentDetails student={student} />}
      <button onClick={confirmDelete} className="delete-button">Delete</button>
    </li>
  )
}

export default Student