import React, { useState } from 'react'
import Student from './Student'

const StudentList = ({ students, handleDelete, handleUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 25

  if (students.length === 0) {
    return <p>No students found.</p>
  }

  const sortedStudents = students.sort(
    (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
  )

  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage)

  const startIndex = (currentPage - 1) * studentsPerPage
  const currentStudents = sortedStudents.slice(startIndex, startIndex + studentsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <ul className="student-list">
        {currentStudents.map(student => (
          <Student 
            key={student.id}
            student={student}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </ul>
      
      <div className="pagination-container">
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default StudentList

