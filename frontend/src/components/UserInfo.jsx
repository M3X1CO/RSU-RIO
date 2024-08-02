import React from 'react'
import '../index.css'

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <span className="icon">👤{user.name}</span>
      Logged In
    </div>
  )
}

export default UserInfo
