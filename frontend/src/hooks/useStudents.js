import { useState, useEffect, useCallback } from 'react'
import studentsService from '../services/students'

const useStudents = (user) => {
  const [students, setStudents] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchStudents = useCallback(async () => {
    if (user) {
      try {
        setLoading(true)
        const initialStudents = await studentsService.getAll()
        setStudents(initialStudents)
      } catch (error) {
        console.error('Error fetching students:', error)
        if (error.response && error.response.status === 401) {
          setErrorMessage('Session expired. Please log in again.')
        } else {
          setErrorMessage('Failed to fetch students')
        }
      } finally {
        setLoading(false)
      }
    } else {
      setStudents([])
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const addStudent = async (studentObject) => {
    try {
      if (!user || !user.token) {
        throw new Error('User not authenticated')
      }
      studentsService.setToken(user.token)
      const returnedStudent = await studentsService.create(studentObject)
      setStudents(students => [...students, returnedStudent])
      return returnedStudent
    } catch (error) {
      handleError(error, 'Failed to add student')
      throw error
    }
  }

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentsService.remove(id)
        setStudents(students.filter(student => student.id !== id))
      } catch (error) {
        handleError(error, 'Failed to delete student')
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
      handleError(error, 'Failed to update student')
      throw error
    }
  }

  const handleError = (error, defaultMessage) => {
    console.error(error)
    if (error.response && error.response.status === 401) {
      setErrorMessage('Session expired. Please log in again.')
    } else {
      setErrorMessage(defaultMessage)
    }
    setTimeout(() => setErrorMessage(null), 5000)
  }

  return { 
    students, 
    errorMessage, 
    loading,
    addStudent, 
    deleteStudent, 
    updateStudent,
    refreshStudents: fetchStudents
  }
}

export default useStudents