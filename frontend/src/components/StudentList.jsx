import React from 'react'
import Student from './Student'

const StudentList = ({ students, handleDelete, handleUpdate }) => {
  if (students.length === 0) {
    return <p>No students found.</p>
  }

  return (
    <ul className="student-list">
      {students.map(student => (
        <Student 
          key={student.id}
          student={student}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </ul>
  )
}

export default StudentList