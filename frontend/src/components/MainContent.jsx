import React from 'react'
import Togglable from './Togglable'
import StudentForm from './StudentForm'
import UserInfo from './UserInfo'
import StudentList from './StudentList'

const MainContent = ({ user, studentFormRef, addStudent, students, deleteStudent }) => {
  return (
    <div>
      <UserInfo user={user} />
      <Togglable buttonLabel='New Student' ref={studentFormRef}>
        <StudentForm createStudent={addStudent} studentFormRef={studentFormRef} />
      </Togglable>
      <StudentList students={students} handleDelete={deleteStudent} />
    </div>
  )
}

export default MainContent