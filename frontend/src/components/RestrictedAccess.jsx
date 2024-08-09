import React from 'react'

const RestrictedAccess = ({ status }) => {
  return (
    <div className="restricted-access">
      <h2>Access Restricted</h2>
      {status === 'pending' ? (
        <p>Your account is currently pending approval. Please contact the administrator for access to the website.</p>
      ) : (
        <p>Your account has been denied access. If you believe this is an error, please contact the administrator.</p>
      )}
      <p>Contact: admin@example.com</p>
    </div>
  )
}

export default RestrictedAccess