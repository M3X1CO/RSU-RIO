import React, { useState } from 'react'

const ITEMS_PER_PAGE = 15

const StudentDetails = ({ student, handleInputChange, isEditable = false }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const studentEntries = Object.entries(student).filter(([key, value]) => {
    const isValid = typeof value !== 'object' && typeof value !== 'function' && key !== 'id'
    return isValid
  })

  const totalItems = studentEntries.length
  const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const currentFields = studentEntries.slice(start, end)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="student-details-wrapper">
      <div className="student-details">
        {!isEditable && <h3>Student Details</h3>}
        <form onSubmit={(e) => e.preventDefault()}>
          <table className="student-fields">
            <tbody>
              {currentFields.map(([key, value]) => (
                <tr key={key}>
                  <td>{key}:</td>
                  <td>
                    {isEditable ? (
                      <input
                        type="text"
                        value={String(value || '')}
                        onChange={(e) => {
                          try {
                            handleInputChange(key, e.target.value)
                          } catch (error) {
                            console.error('Error handling input change:', error)
                          }
                        }}
                      />
                    ) : (
                      String(value || '')
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      {pageCount > 1 && (
        <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? 'active' : ''}
                type="button"
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentDetails
