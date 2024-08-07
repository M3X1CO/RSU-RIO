import React, { useState } from 'react';

const ITEMS_PER_PAGE = 15;

const StudentDetails = ({ student, handleInputChange, isEditable = false }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const studentEntries = Object.entries(student).filter(([key, value]) => 
    typeof value !== 'object' && typeof value !== 'function'
  );

  const totalItems = studentEntries.length;
  const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentFields = studentEntries.slice(start, end);

  return (
    <div className="student-details">
      {!isEditable && <h3>Student Details</h3>}
      <table className="student-fields">
        <tbody>
          {currentFields.map(([key, value]) => (
            <tr key={key}>
              <td>{key}:</td>
              <td>
                {isEditable ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                ) : (
                  String(value)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pageCount > 1 && (
        <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;