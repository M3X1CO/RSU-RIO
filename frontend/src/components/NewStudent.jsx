import React, { useState, useCallback } from 'react';
import StudentDetails from './StudentDetails';
import Student from './Student';
import { initialStudentState } from './InitialStudentState';

const NewStudent = () => {
  const [student, setStudent] = useState(initialStudentState);
  const [showForm, setShowForm] = useState(true); // State to manage form visibility

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
    setShowForm(false); // Hide form on save
    // Implement your save logic here
    // For example:
    // postStudentData(student);
  }, [student]);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div>
      <h2>Create New Student</h2>
      {showForm ? (
        <form onSubmit={handleSave}>
          <StudentDetails 
            student={student}
            handleInputChange={handleInputChange}
            isEditable={true}
          />
          <button type="submit">Save Student</button>
        </form>
      ) : (
        <button onClick={toggleForm}>Add New Student</button>
      )}
      {!showForm && (
        <Student 
          student={student} 
          showDetails={true} 
          toggleDetails={toggleForm} 
          handleDelete={(id) => console.log(`Delete student with id: ${id}`)} 
        />
      )}
    </div>
  );
};

export default NewStudent;
