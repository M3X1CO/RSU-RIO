// StudentDetails.jsx
import React from 'react';

const ITEMS_PER_PAGE = 15;

const StudentDetails = ({ student, handleInputChange, isEditable = false, currentPage, setCurrentPage }) => {
  // Add console logs for debugging
  console.log('StudentDetails props:', { student, handleInputChange, isEditable, currentPage, setCurrentPage });

  // Check if required props are functions
  if (typeof handleInputChange !== 'function') {
    console.error('handleInputChange is not a function');
    return <div>Error: handleInputChange is not properly defined</div>;
  }

  if (typeof setCurrentPage !== 'function') {
    console.error('setCurrentPage is not a function');
    return <div>Error: setCurrentPage is not properly defined</div>;
  }

  const studentEntries = Object.entries(student).filter(([key, value]) => 
    typeof value !== 'object' && typeof value !== 'function'
  );

  const totalItems = studentEntries.length;
  const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentFields = studentEntries.slice(start, end);

  // Wrap the setCurrentPage call in a try-catch block
  const handlePageChange = (page) => {
    try {
      setCurrentPage(page);
    } catch (error) {
      console.error('Error setting current page:', error);
    }
  };

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
                    value={value || ''}
                    onChange={(e) => {
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
                onClick={() => handlePageChange(page)}
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