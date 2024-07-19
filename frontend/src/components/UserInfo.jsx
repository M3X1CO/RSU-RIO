import React from 'react'

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <span className="icon">👤</span> {/* Optional: Add an icon if desired */}
      <p>{user.name} logged in</p>
    </div>
  )
}

export default UserInfo
