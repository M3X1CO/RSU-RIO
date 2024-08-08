import React, { useState } from 'react'
import * as XLSX from 'exceljs'
import StudentDetails from './StudentDetails'
import { initialStudentState } from './InitialStudentState'
import useStudents from '../hooks/useStudents'  // Changed to default import

const XLSXImporter = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const { addStudent, errorMessage } = useStudents(user);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const workbook = new XLSX.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.getWorksheet(1);
    const studentsData = [];

    const studentFields = Object.keys(initialStudentState);

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Skip the header row
        const studentData = {};
        row.eachCell((cell, colNumber) => {
          if (colNumber <= studentFields.length) {
            const field = studentFields[colNumber - 1];
            studentData[field] = cell.value;
          }
        });
        studentsData.push(studentData);
      }
    });

    setStudents(studentsData);
  };

  const handleInputChange = (key, value) => {
    setStudents(prevStudents => {
      const updatedStudents = [...prevStudents];
      updatedStudents[currentStudentIndex] = {
        ...updatedStudents[currentStudentIndex],
        [key]: value
      };
      return updatedStudents;
    });
  };

  const handleSaveStudent = async () => {
    const currentStudent = students[currentStudentIndex];
    try {
      const savedStudent = await addStudent(currentStudent);
      console.log('Student saved successfully:', savedStudent);

      // Move to the next student
      if (currentStudentIndex < students.length - 1) {
        setCurrentStudentIndex(prevIndex => prevIndex + 1);
      } else {
        console.log('All students processed');
      }
    } catch (error) {
      console.error('Failed to save student:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".xlsx" />
      {students.length > 0 && (
        <div>
          <h2>Student {currentStudentIndex + 1} of {students.length}</h2>
          <StudentDetails
            student={students[currentStudentIndex]}
            handleInputChange={handleInputChange}
            isEditable={true}
          />
          <button onClick={handleSaveStudent}>Save Student</button>
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default XLSXImporter;