import React from 'react'

const ErrorMessage = ({ message, onDismiss }) => (
  <div className="error-message">
    <p>{message}</p>
    {onDismiss && <button onClick={onDismiss}>Ok</button>}
  </div>
)

export default ErrorMessage