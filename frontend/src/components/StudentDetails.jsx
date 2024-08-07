import React, { useState } from 'react';

const ITEMS_PER_PAGE = 15;

const StudentDetails = ({ student, handleInputChange, isEditable = false }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter out non-primitive values
  const studentEntries = Object.entries(student).filter(([key, value]) => {
    const isValid = typeof value !== 'object' && typeof value !== 'function';
    console.log(`Filtering entry: ${key} with value: ${value}, isValid: ${isValid}`);
    return isValid;
  });

  const totalItems = studentEntries.length;
  const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentFields = studentEntries.slice(start, end);

  const handlePageChange = (e, page) => {
    console.log(`handlePageChange called with e: ${e} and page: ${page}`);
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className="student-details">
      {!isEditable && <h3>Student Details</h3>}
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log('Form submission prevented');
      }}>
        <table className="student-fields">
          <tbody>
            {currentFields.map(([key, value]) => (
              <tr key={key}>
                <td>{key}:</td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={value || ''}
                      onChange={(e) => {
                        console.log(`Input change detected for ${key} with value: ${e.target.value}`);
                        try {
                          handleInputChange(key, e.target.value);
                        } catch (error) {
                          console.error('Error handling input change:', error);
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
        {pageCount > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={(e) => {
                    console.log(`Button clicked for page ${page}`);
                    handlePageChange(e, page);
                  }}
                  className={currentPage === page ? 'active' : ''}
                  type="button"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentDetails;
