import React, { useState } from 'react';
import StudentDetails from './StudentDetails';

const generateInitialStudentData = () => {
  return {
    name: '',
    originalPassportNumber: '',
    dateOfBirth: '',
    nationality: '',
    gender: '',
    course: '',
    startDate: '',
    endDate: '',
    // Add all other fields you need for a student, initialized to empty strings
  };
};

const NewStudent = () => {
  const [studentData, setStudentData] = useState(generateInitialStudentData());
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (key, value) => {
    setStudentData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log('Saving student data:', studentData);
  };

  return (
    <div>
      <h2>Create New Student</h2>
      <StudentDetails 
        student={studentData}
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