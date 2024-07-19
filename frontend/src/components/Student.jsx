import React, { useState } from 'react'

const Student = ({ name, passport, user, deleteStudent, id }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <li className='student'>
      <p>
        <strong>Student's Name:</strong> 
        <span style={{ color: 'blue' }}>{name}</span> 
        <strong>Student's Passport Number:</strong> 
        <span style={{ color: 'green' }}>{passport}</span>
      </p>
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div>
          <p>Additional details about the student</p>
          <p>Created by: {user.name}</p>
        </div>
      )}
      <button onClick={() => deleteStudent(id)}>Delete</button>
    </li>
  )
}

export default Student
