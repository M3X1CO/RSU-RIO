import { createSlice, current } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import studentService from '../services/students'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const studentSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    appendStudent(state, action) {
      state.push(action.payload)
    },
    setStudents(state, action) {
      return action.payload
    }
  },
})

export const { appendStudent, setStudents } = studentSlice.actions

export const initializeStudents = () => {
  return async dispatch => {
    const students = await studentService.getAll()
    dispatch(setStudents(students))
  }
}

export const createStudent = (name, passport) => {
  return async (dispatch) => {
    try {
      const newStudent = await studentService.create({ name, passport })
      dispatch(appendStudent(newStudent))
      dispatch(showNotification(`Added new student: ${name}`, 5000))
    } catch (error) {
      dispatch(showNotification('Failed to add Student', 5000))
    }
  }
}

export default studentSlice.reducer