import React from 'react'
import XLSXImporter from './XLSXImporter'

const Footer = ({ user, logout, addStudent, setView, isAdmin }) => {
  console.log('user', user)

  return (
    <footer className="footer">
      <XLSXImporter addStudent={addStudent} />
      <div className="copyright">
        <em>Student Management App<br/></em>
        <em>Department of Computer Science<br/></em>
        <em>Rangsit University 2024</em>
      </div>
      {user && (
        <div className="user-info-container">
          <div className="user-info">
            <span>{user.username}</span>
          </div>
          {isAdmin && (
            <button onClick={() => setView('admin')} className="admin-button">Admin</button>
          )}
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </footer>
  );
};

export default Footer