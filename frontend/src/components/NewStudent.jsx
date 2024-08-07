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

  const handleSave = useCallback((e) => {
    e.preventDefault(); // Prevent form submission
    console.log('Saving student:', student);
    // Implement your save logic here
    // For example:
    // postStudentData(student);
  }, [student]);

  return (
    <div>
      <h2>Create New Student</h2>
      <form onSubmit={handleSave}>
        <StudentDetails 
          student={student}
          handleInputChange={handleInputChange}
          isEditable={true}
        />
        <button type="submit">Save Student</button>
      </form>
    </div>
  );
};

export default NewStudent;