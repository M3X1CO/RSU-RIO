import React from 'react'
import Togglable from './Togglable'
import StudentForm from './StudentForm'
import StudentList from './StudentList'
import Search from './Search'

const MainContent = ({
  user,
  studentFormRef,
  addStudent,
  students,
  deleteStudent,
  updateStudent,
  oldPassportSearch,
  newPassportSearch,
  setOldPassportSearch,
  setNewPassportSearch
}) => {
  return (
    <div>
      <Search 
        oldPassportSearch={oldPassportSearch} 
        newPassportSearch={newPassportSearch} 
        setOldPassportSearch={setOldPassportSearch} 
        setNewPassportSearch={setNewPassportSearch} 
      />
      <Togglable buttonLabel='New Student' ref={studentFormRef}>
        <StudentForm addStudent={addStudent} studentFormRef={studentFormRef} />
      </Togglable>
      <StudentList 
        students={students} 
        handleDelete={deleteStudent} 
        handleUpdate={updateStudent}
      />
    </div>
  )
}

export default MainContent