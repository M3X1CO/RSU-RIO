import React from 'react'
import Student from './Student'

const StudentList = ({ students, handleDelete }) => {
  return (
    <ul className="student-list">
      {students.map(student => (
        <Student 
          key={student.id}
          student={student}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  )
}

export default StudentList