import { useState, useEffect } from 'react'
import studentsService from '../services/students'

const useStudents = (user) => {
  const [students, setStudents] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (user) {
      studentsService.getAll()
        .then(initialStudents => {
          setStudents(initialStudents)
        })
        .catch(error => {
          console.error('Error fetching students:', error)
          setErrorMessage('Failed to fetch students')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }, [user])

  const addStudent = (studentObject) => {
    console.log('addStudent called with:', studentObject)
    return studentsService  // Make sure to return the Promise
      .create(studentObject)
      .then(returnedStudent => {
        setStudents(students => [...students, returnedStudent])
        return returnedStudent  // Return the created student
      })
      .catch(error => {
        console.error('Error adding student:', error)
        setErrorMessage('Failed to add student')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        throw error  // Re-throw the error to be caught in StudentForm
      })
  }

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentsService.remove(id)
        setStudents(students.filter(student => student.id !== id))
      } catch (error) {
        console.error('Error deleting student:', error)
        setErrorMessage('Failed to delete student')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return { students, errorMessage, addStudent, deleteStudent }
}

export default useStudents