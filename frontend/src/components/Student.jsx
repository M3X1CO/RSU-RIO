import React, { useState } from 'react'

const Student = ({ name, passport, user, deleteStudent, id }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div>
      <p>{name} {passport}</p>
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
    </div>
  )
}

export default Student
