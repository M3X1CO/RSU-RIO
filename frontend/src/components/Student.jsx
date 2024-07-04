import React, { useState } from 'react';

const Names = ({ student, deleteName }) => {
  const [showAdditionalSection, setShowAdditionalSection] = useState(false);

  const toggleAdditionalSection = () => {
    setShowAdditionalSection(!showAdditionalSection);
  };

  return (
    <div style={{ borderBottom: '1px solid lightgray', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {student.name} {student.passport}
        </div>
        <div>
          <button onClick={toggleAdditionalSection}>
            {showAdditionalSection ? 'Hide' : 'Show'} Details
          </button>
          <button onClick={() => deleteName(student.id)}>Delete</button>
        </div>
      </div>
      {showAdditionalSection && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', position: 'relative' }}>
          <h4>Additional Details</h4>
          <p>This section can be used to add more information about {student.name}.</p>
          {/* You can add form fields, text inputs, or any other content here for future use */}
          <button 
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem'
            }}
            onClick={() => alert('Button clicked')}
            >
              View Students Page
            </button>
        </div>
      )}
    </div>
  );
};
  
const Filter = ({ searchPassportNumber, handleSearchPassportNumber }) => {
  return (
    <div>
      SEARCH PASSPORT #:<br/> {' '}
      <input 
        id="searchInput" 
        name="search" 
        value={searchPassportNumber} 
        onChange={handleSearchPassportNumber} 
        autoComplete="off" 
      />
    </div>
  );
}  
  
const StudentForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  const [nameError, setNameError] = useState('');
  const [passportError, setPassportError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName.trim() && !newNumber.trim()) {
      setNameError('Name and passport number are required.');
      setPassportError('');
    } else if (!newName.trim()) {
      setNameError('Name is required.');
      setPassportError('');
    } else if (!newNumber.trim()) {
      setPassportError('Passport number is required.');
      setNameError('');
    } else {
      setNameError('');
      setPassportError('');
      addName(event);
    }

    setTimeout(() => {
      setNameError('');
      setPassportError('');
    }, 4000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          Name:<br/> 
          <input 
            id="nameInput" 
            name="name" 
            value={newName} 
            onChange={handleNameChange} 
            autoComplete="off" 
          />
          {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          Passport Number:<br/> 
          <input 
            id="passportNumberInput" 
            name="passport" 
            value={newNumber} 
            onChange={handleNumberChange} 
            autoComplete="off" 
          />
          {passportError && <span style={{ color: 'red' }}>{passportError}</span>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};  
  
const Students = ({ students, deleteName }) => {
  return (
    <div>
      {students.map((student) => (
        <Names key={student.id} student={student} deleteName={deleteName} />
      ))}
    </div>
  );
};

export { Names, Filter, StudentForm, Students };
