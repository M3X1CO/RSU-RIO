import React from 'react'

const RestrictedAccess = ({ status }) => {
  let message = ''

  switch (status) {
    case 'pending':
      message = 'Your account is currently pending approval. Please contact the administrator for access to the website.'
      break
    case 'denied':
      message = 'Your account has been denied access. If you believe this is an error, please contact the administrator.'
      break
    default:
      message = 'You do not have access to this website. Please contact the administrator for assistance.'
  }

  return (
    <div className="restricted-access">
      <h2>Access Restricted</h2>
      <p>{message}</p>
      <p>Contact: admin@example.com</p>
    </div>
  )
}

export default RestrictedAccess