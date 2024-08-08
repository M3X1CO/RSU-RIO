import React from 'react';
import XLSXImporter from './XLSXImporter';

const Footer = ({ addStudent }) => {
  return (
    <footer className="footer">
      <XLSXImporter addStudent={addStudent} />
      <div className="copyright">
        <em>Student Management App<br/></em>
        <em>Department of Computer Science<br/></em>
        <em>Rangsit University 2024</em>
      </div>
    </footer>
  );
};

export default Footer;