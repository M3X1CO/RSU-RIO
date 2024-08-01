import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeStudents } from './reducers/studentReducer'
import NewStudent from './components/StudentForm'
import Students from './components/StudentList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeStudents())
  }, [dispatch])

  return (
    <div>
      <h2>Add a Student</h2>
      <Notification />
      <NewStudent />
      <VisibilityFilter />
      <h2>Current Students</h2>
      <Students />
    </div>
  )
}

export default App