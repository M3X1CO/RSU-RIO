import React from 'react';
import XLSXImporter from './XLSXImporter';

const Footer = ({ user, addStudent }) => {
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
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </footer>
  );
};

export default Footer;