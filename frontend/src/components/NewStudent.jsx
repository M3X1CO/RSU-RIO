// NewStudent.jsx
import React, { useState, useCallback } from 'react';
import StudentDetails from './StudentDetails';
import { initialStudentState } from './InitialStudentState';

const NewStudent = () => {
  const [student, setStudent] = useState(initialStudentState);

  const handleInputChange = useCallback((key, value) => {
    console.log(`Updating ${key} to ${value}`);
    setStudent(prevStudent => ({
      ...prevStudent,
      [key]: value
    }));
  }, []);

  const handleSave = useCallback(() => {
    console.log('Saving student:', student);
    // Implement your save logic here
  }, [student]);

  return (
    <div>
      <h2>Create New Student</h2>
      <StudentDetails 
        student={student}
        handleInputChange={handleInputChange}
        isEditable={true}
      />
      <button onClick={handleSave}>Save Student</button>
    </div>
  );
};

export default NewStudent;