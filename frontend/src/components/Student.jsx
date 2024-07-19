import React, { useState } from 'react'

const Student = ({ name, passport, user, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      handleDelete(id)
    }
  }

  return (
    <li className='student'>
      <p>
        <strong>Student's Name: </strong> 
        <span style={{ color: 'green' }}>{name}<br/></span> 
        <strong>Student's Passport Number: </strong> 
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
      <button onClick={confirmDelete} className="delete-button">Delete</button>
    </li>
  )
}

export default Student
