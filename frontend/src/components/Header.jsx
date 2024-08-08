import React from 'react'

const Header = ({ user, logout }) => {
  return (
    <div className="header-container">
      <div className="header-title">
        <strong><h1>Student Management App</h1></strong>
      </div>
      {user && (
        <div className="user-info-container">
          <div className="user-info">
            <UserInfo user={user} />
          </div>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  )
}

export default Header
