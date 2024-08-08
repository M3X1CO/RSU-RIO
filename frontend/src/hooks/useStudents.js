import { useState, useEffect } from 'react'
import studentsService from '../services/students'

const useStudents = (user) => {
  const [students, setStudents] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (user) {
      studentsService.getAll()
        .then(initialStudents => setStudents(initialStudents))
        .catch(error => {
          setErrorMessage('Failed to fetch students')
          setTimeout(() => setErrorMessage(null), 5000)
        })
    }
  }, [user])

  const addStudent = (studentObject) => {
    return studentsService
      .create(studentObject)
      .then(returnedStudent => {
        setStudents(students => [...students, returnedStudent])
        return returnedStudent
      })
      .catch(error => {
        setErrorMessage('Failed to add student')
        setTimeout(() => setErrorMessage(null), 5000)
        throw error
      })
  }

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentsService.remove(id)
        setStudents(students.filter(student => student.id !== id))
      } catch (error) {
        setErrorMessage('Failed to delete student')
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
  }

  const updateStudent = async (updatedStudent) => {
    try {
      const returnedStudent = await studentsService.update(updatedStudent.id, updatedStudent)
      setStudents(students.map(student => 
        student.id !== updatedStudent.id ? student : returnedStudent
      ))
      return returnedStudent
    } catch (error) {
      setErrorMessage('Failed to update student')
      setTimeout(() => setErrorMessage(null), 5000)
      throw error
    }
  }

  return { students, errorMessage, addStudent, deleteStudent, updateStudent }
}

export default useStudents