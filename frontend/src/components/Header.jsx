import React from 'react'
import UserInfo from './UserInfo'

const Header = ({ user, logout }) => {
  const headerStyle = {
    color: '#979694',
    fontStyle: 'italic',
    fontSize: '24px',
    textAlign: 'center',
    position: 'relative',
    padding: '10px',
  }

  const userInfoContainerStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  }

  const userInfoStyle = {
    marginBottom: '5px',
  }

  return (
    <div>
      <div style={headerStyle}>
        <strong><h1>Student Management App</h1></strong>
      </div>
      {user && (
        <div style={userInfoContainerStyle}>
          <div style={userInfoStyle}>
            <UserInfo user={user} />
          </div>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  )
}

export default Header
