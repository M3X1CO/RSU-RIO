import React from 'react'
import UserInfo from './UserInfo'

const Header = ({ user, logout }) => {
  const headerStyle = {
    color: '#979694',
    fontStyle: 'italic',
    fontSize: 24,
    textAlign: 'center',
  }

  const userInfoStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    textAlign: 'right'
  }

  return (
    <div>
      <div style={headerStyle}>
        <strong><h1>Student Management App</h1></strong>
      </div>
      {user && (
        <div style={userInfoStyle}>
          <UserInfo user={user} />
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  )
}

export default Header
