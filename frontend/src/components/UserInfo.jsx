import React from 'react'

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <span className="icon">👤{user.name}</span>
    </div>
  )
}

export default UserInfo
