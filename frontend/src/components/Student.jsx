import React, { useState } from 'react'
import StudentDetails from './StudentDetails'

const Student = ({ student, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => setShowDetails(!showDetails)

  const confirmDelete = () => {
      handleDelete(student.id)
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
      <button onClick={toggleDetails} className="toggle-details-button">
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <StudentDetails student={student} />}
      <button onClick={confirmDelete} className="delete-button">Delete</button>
    </li>
  )
}

export default Student