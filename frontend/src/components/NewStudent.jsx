// NewStudent.jsx
import React, { useState } from 'react';
import StudentDetails from './StudentDetails';
import { initialStudentState } from './InitialStudentState';

const NewStudent = () => {
  const [student, setStudent] = useState(initialStudentState);
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (key, value) => {
    setStudent(prevStudent => ({
      ...prevStudent,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log('Saving student:', student);
  };

  return (
    <div>
      <h2>Create New Student</h2>
      <StudentDetails 
        student={student}
        handleInputChange={handleInputChange}
        isEditable={true}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <button onClick={handleSave}>Save Student</button>
    </div>
  );
};

export default NewStudent;