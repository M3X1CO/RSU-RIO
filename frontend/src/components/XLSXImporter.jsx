import React, { useState } from 'react'
import * as XLSX from 'exceljs'
import StudentDetails from './StudentDetails'
import { initialStudentState } from './InitialStudentState'
import useStudents from '../hooks/useStudents'
import StudentExists from './StudentExists'
import ErrorMessage from './ErrorMessage'

const XLSXImporter = ({ user, onImportComplete }) => {
  const [students, setStudents] = useState([])
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
  const [error, setError] = useState(null)
  const { addStudent, refreshStudents } = useStudents(user)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const workbook = new XLSX.Workbook()
    await workbook.xlsx.load(file)

    const worksheet = workbook.getWorksheet(1)
    const studentsData = []

    const studentFields = Object.keys(initialStudentState)
    const hiddenColumns = new Set()

    worksheet.columns.forEach((col, index) => {
      if (col.hidden) hiddenColumns.add(index + 1)
    })

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const firstColumnCell = row.getCell(1)
        const firstColumnValue = firstColumnCell ? firstColumnCell.text : ''

        if (!firstColumnValue.trim()) return

        const studentData = {}
        studentFields.forEach((field, index) => {
          const cellIndex = index + 1

          if (hiddenColumns.has(cellIndex)) return

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
                value = cell.text || ''
                break
              case XLSX.ValueType.Boolean:
                value = cell.value ? 'TRUE' : 'FALSE'
                break
              case XLSX.ValueType.Formula:
                value = cell.result || ''
                break
              default:
                value = ''
            }
          }

          studentData[field] = value
        })

        studentFields.forEach(field => {
          if (!(field in studentData)) studentData[field] = initialStudentState[field] || ''
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
      const exists = await StudentExists(currentStudent.oldPassportNumber, currentStudent.newPassportNumber)
      if (exists) {
        setError(`Student with passport number ${currentStudent.oldPassportNumber || currentStudent.newPassportNumber} already exists. Skipping...`)
        setTimeout(() => setError(null), 5000)
        
        if (currentStudentIndex < students.length - 1) {
          setCurrentStudentIndex(prevIndex => prevIndex + 1)
        } else {
          console.log('All students processed')
          await refreshStudents()
          setStudents([])
          setCurrentStudentIndex(0)
          onImportComplete()
        }
        return
      }

      await addStudent(currentStudent, user)

      if (currentStudentIndex < students.length - 1) {
        setCurrentStudentIndex(prevIndex => prevIndex + 1)
      } else {
        console.log('All students processed')
        await refreshStudents()
        setStudents([])
        setCurrentStudentIndex(0)
        onImportComplete()
      }
    } catch (error) {
      console.error('Failed to save student:', error)
      setError('Failed to save student. Please try again.')
      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload File
      </label>
      <input id="file-upload" type="file" onChange={handleFileUpload} accept=".xlsx" />
      {students.length > 0 && (
        <div className="student-details-container">
          <h2 className="footer-h2">Student {currentStudentIndex + 1} of {students.length}</h2>
          <StudentDetails
            student={students[currentStudentIndex]}
            handleInputChange={handleInputChange}
            isEditable
          />
          <div>
            <button onClick={handleSaveStudent}>Save Student</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default XLSXImporter
