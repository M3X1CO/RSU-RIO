import React, { useState } from 'react'

const Student = ({ name, passport, user, deleteStudent, id }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <li className='student'>
      <p>Student's Name: {name} Student's Passport Number: {passport}</p>
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
