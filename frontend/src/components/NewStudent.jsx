import React, { useState, useCallback } from 'react';
import StudentDetails from './StudentDetails';
import Student from './Student';
import { initialStudentState } from './InitialStudentState';

const NewStudent = () => {
  const [student, setStudent] = useState(initialStudentState);
  const [showDetails, setShowDetails] = useState(true);

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
    setShowDetails(false); // Hide details on save
    // Implement your save logic here
    // For example:
    // postStudentData(student);
  }, [student]);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div>
      <h2>Create New Student</h2>
      <form onSubmit={handleSave}>
        {showDetails && (
          <StudentDetails 
            student={student}
            handleInputChange={handleInputChange}
            isEditable={true}
          />
        )}
        <button type="submit">Save Student</button>
      </form>
      <Student 
        student={student} 
        showDetails={showDetails} 
        toggleDetails={toggleDetails} 
        handleDelete={(id) => console.log(`Delete student with id: ${id}`)} 
      />
    </div>
  );
};

export default NewStudent;
