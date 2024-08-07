import React, { useState } from 'react';
import StudentDetails from './StudentDetails';

const NewStudent = () => {
  const [studentData, setStudentData] = useState({});
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