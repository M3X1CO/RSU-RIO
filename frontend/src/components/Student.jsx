import React from 'react';
import StudentDetails from './StudentDetails';
import '../index.css';

const Student = ({ student, handleDelete, showDetails, toggleDetails }) => {
  const confirmDelete = () => {
    handleDelete(student.id);
  };

  return (
    <li className='student'>
      <p>
        <span className='label'>Student's Name: </span>
        <span className='student-name'>{student.name}<br/></span>
        <span className='label'>Student's Passport Number: </span>
        <span className='student-passport'>{student.originalPassportNumber}</span>
      </p>
      <button onClick={toggleDetails} className="toggle-details-button">
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <StudentDetails student={student} />}
      <button onClick={confirmDelete} className="delete-button">Delete</button>
    </li>
  );
};

export default Student;
