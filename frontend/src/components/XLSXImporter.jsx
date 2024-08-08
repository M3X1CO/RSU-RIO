import React, { useState } from 'react'
import * as XLSX from 'exceljs'
import StudentDetails from './StudentDetails'
import { initialStudentState } from './InitialStudentState'
import useStudents from '../hooks/useStudents'
import '../index.css'

const XLSXImporter = ({ user }) => {
  const [students, setStudents] = useState([])
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
  const { addStudent, errorMessage } = useStudents(user)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const workbook = new XLSX.Workbook()
    await workbook.xlsx.load(file)

    const worksheet = workbook.getWorksheet(1)
    const studentsData = []

    const studentFields = Object.keys(initialStudentState)
    const hiddenColumns = new Set()

    // Determine hidden columns
    worksheet.columns.forEach((col, index) => {
      if (col.hidden) {
        hiddenColumns.add(index + 1) // Excel columns are 1-based index
      }
    })

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const studentData = {}
        studentFields.forEach((field, index) => {
          if (field === 'newPassportNumber') {
            studentData[field] = '' // Set newPassportNumber to an empty string
            return // Skip the rest of the loop iteration
          }

          const cellIndex = index + 1
          if (hiddenColumns.has(cellIndex)) {
            return // Skip processing for hidden columns
          }

          const cell = row.getCell(cellIndex)
          let value = ''

          if (cell && cell.value !== null && cell.value !== undefined) {
            switch (cell.type) {
              case XLSX.ValueType.String:
                value = cell.text || ''
                break
              case XLSX.ValueType.Number:
                value = cell.value !== null && cell.value !== undefined ? String(cell.value).trim() : ''
                break
              case XLSX.ValueType.Date:
                value = cell.text || '' // Use cell.text for date formatting
                break
              case XLSX.ValueType.Boolean:
                value = cell.value ? 'TRUE' : 'FALSE'
                break
              case XLSX.ValueType.Formula:
                value = cell.result || '' // Formula results
                break
              default:
                value = '' // Default case for unsupported types
                break
            }
          }

          studentData[field] = value
        })

        studentsData.push(studentData)
      }
    })

    setStudents(studentsData)
  }

  const handleInputChange = (key, value) => {
    setStudents(prevStudents => {
      const updatedStudents = [...prevStudents]
      updatedStudents[currentStudentIndex] = {
        ...updatedStudents[currentStudentIndex],
        [key]: value
      }
      return updatedStudents
    })
  }

  const handleSaveStudent = async () => {
    const currentStudent = students[currentStudentIndex]
    try {
      await addStudent(currentStudent)

      if (currentStudentIndex < students.length - 1) {
        setCurrentStudentIndex(prevIndex => prevIndex + 1)
      } else {
        console.log('All students processed')
        setStudents([])
      }
    } catch (error) {
      console.error('Failed to save student:', error)
    }
  }

  const handleCancel = () => {
    setStudents([])
    setCurrentStudentIndex(0)
  }

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload File
      </label>
      <input id="file-upload" type="file" onChange={handleFileUpload} accept=".xlsx" />
      {students.length > 0 && (
        <div>
          <h2>Student {currentStudentIndex + 1} of {students.length}</h2>
          <StudentDetails
            student={students[currentStudentIndex]}
            handleInputChange={handleInputChange}
            isEditable={true}
          />
          <div>
            <button onClick={handleSaveStudent}>Save Student</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  )
}

export default XLSXImporter
