import React, { useState } from 'react'

const Student = ({ name, passport }) => {
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
          {/* Add additional details here */}
          <p>Additional details about the student</p>
        </div>
      )}
    </div>
  )
}

export default Student
