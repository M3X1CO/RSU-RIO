// NewStudent.jsx
import React, { useState, useCallback } from 'react';
import StudentDetails from './StudentDetails';
import { initialStudentState } from './InitialStudentState';

const NewStudent = () => {
  const [student, setStudent] = useState(initialStudentState);
  const [currentPage, setCurrentPage] = useState(1);

  // Use useCallback to memoize these functions
  const handleInputChange = useCallback((key, value) => {
    console.log(`Updating ${key} to ${value}`);
    setStudent(prevStudent => ({
      ...prevStudent,
      [key]: value
    }));
  }, []);

  const handleSetCurrentPage = useCallback((page) => {
    console.log(`Setting current page to ${page}`);
    setCurrentPage(page);
  }, []);

  const handleSave = useCallback(() => {
    console.log('Saving student:', student);
    // Implement your save logic here
  }, [student]);

  console.log('Rendering NewStudent component', { student, currentPage });

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