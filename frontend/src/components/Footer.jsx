import React from 'react';
import CSVImporter from './CSVImporter';

const Footer = ({ addStudent }) => {
  return (
    <footer className="footer">
      <CSVImporter addStudent={addStudent} />
      <div className="copyright">
        <em>Student Management App, Department of Computer Science, Rangsit University 2024</em>
      </div>
    </footer>
  );
};

export default Footer;