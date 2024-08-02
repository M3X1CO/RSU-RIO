import React from 'react'
import '../index.css'

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <span className="icon">👤{user.name}</span>
      <p>Logged In</p>
    </div>
  )
}

export default UserInfo
