import React from 'react';
import CSVImporter from './CSVImporter';

const Footer = ({ addStudent }) => {
  const footerStyle = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '20px 0',
    textAlign: 'center'
  };

  const copyrightStyle = {
    color: '#979694',
    fontStyle: 'italic',
    fontSize: 16,
    marginTop: '10px'
  };

  return (
    <footer style={footerStyle}>
      <CSVImporter addStudent={addStudent} />
      <div style={copyrightStyle}>
        <em>Student Management App, Department of Computer Science, Rangsit University 2024</em>
      </div>
    </footer>
  );
};

export default Footer;