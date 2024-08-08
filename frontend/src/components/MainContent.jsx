import React from 'react'
import Togglable from './Togglable'
import StudentForm from './StudentForm'
import StudentList from './StudentList'

const MainContent = ({ user, studentFormRef, addStudent, students, deleteStudent }) => {
  return (
    <div>
      <Togglable buttonLabel='New Student' ref={studentFormRef}>
        <StudentForm addStudent={addStudent} studentFormRef={studentFormRef} />
      </Togglable>
      <StudentList students={students} handleDelete={deleteStudent} />
    </div>
  )
}

export default MainContent