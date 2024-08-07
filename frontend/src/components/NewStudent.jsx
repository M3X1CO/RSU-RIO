// NewStudent.jsx
import React, { useState, useCallback, useEffect } from 'react';
import StudentDetails from './StudentDetails';
import { initialStudentState } from './InitialStudentState';

const NewStudent = () => {
  const [student, setStudent] = useState(initialStudentState);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('Current state:', { student, currentPage });
    console.log('setCurrentPage type:', typeof setCurrentPage);
  }, [student, currentPage]);

  const handleInputChange = useCallback((key, value) => {
    console.log(`Updating ${key} to ${value}`);
    setStudent(prevStudent => ({
      ...prevStudent,
      [key]: value
    }));
  }, []);

  const handleSetCurrentPage = useCallback((page) => {
    console.log(`Setting current page to ${page}`);
    if (typeof setCurrentPage !== 'function') {
      console.error('setCurrentPage is not a function');
      return;
    }
    setCurrentPage(page);
  }, []);

  const handleSave = useCallback(() => {
    console.log('Saving student:', student);
    // Implement your save logic here
  }, [student]);

  if (typeof setCurrentPage !== 'function') {
    console.error('setCurrentPage is not a function in render');
    return <div>Error: setCurrentPage is not properly defined</div>;
  }

  return (
    <div>
      <h2>Create New Student</h2>
      <StudentDetails 
        student={student}
        handleInputChange={handleInputChange}
        isEditable={true}
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
      />
      <button onClick={handleSave}>Save Student</button>
    </div>
  );
};

export default NewStudent;