import React, { useState } from 'react';

const ITEMS_PER_PAGE = 15;

const StudentDetails = ({ student }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="student-details">
      <h3>Student Details</h3>
      <PaginatedStudentFields student={student} itemsPerPage={ITEMS_PER_PAGE} currentPage={currentPage} />
      <Pagination 
        totalItems={Object.keys(student).length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const PaginatedStudentFields = ({ student, itemsPerPage, currentPage }) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentFields = Object.entries(student).slice(start, end);

  return (
    <table className="student-fields">
      <tbody>
        {currentFields.map(([key, value]) => renderDetailRow(key, value, key, null, false))}
      </tbody>
    </table>
  );
};

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const renderDetailRow = (label, value, key, handleInputChange, isEditable) => {
  return (
    <tr key={key}>
      <td>{label}:</td>
      <td>
        {isEditable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        ) : (
          value
        )}
      </td>
    </tr>
  );
};

export default StudentDetails;