import React from 'react'
import Student from './Student'

const StudentList = ({ students, handleDelete, handleUpdate }) => {
  if (students.length === 0) {
    return <p>No students found.</p>
  }

  const sortedStudents = students.sort(
    (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
  )

  return (
    <ul className="student-list">
      {sortedStudents.map(student => (
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
