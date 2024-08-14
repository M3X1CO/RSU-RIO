import React from 'react'
import XLSXImporter from './XLSXImporter'

const Footer = ({ user, logout, addStudent, setView, isAdmin, refreshStudents }) => {

  return (
    <footer className="footer">
      <XLSXImporter addStudent={addStudent} user={user} refreshStudents={refreshStudents} />
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
            <div className="admin-buttons">
              <button onClick={() => setView('admin')} className="admin-button">Admin</button>
              <button onClick={() => setView('main')} className="admin-button">Home</button>
            </div>
          )}
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </footer>
  );
};

export default Footer