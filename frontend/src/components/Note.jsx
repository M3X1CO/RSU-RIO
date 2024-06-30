import React, { useState } from 'react';

const Names = ({ person, deleteName }) => {
  const [showAdditionalSection, setShowAdditionalSection] = useState(false);

  const toggleAdditionalSection = () => {
    setShowAdditionalSection(!showAdditionalSection);
  };

  return (
    <div style={{ borderBottom: '1px solid lightgray', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {person.name} {person.passportNumber}
        </div>
        <div>
          <button onClick={toggleAdditionalSection}>
            {showAdditionalSection ? 'Hide' : 'Show'} Details</button>
          <button onClick={() => deleteName(person.id)}>Delete</button>
        </div>
      </div>
      {showAdditionalSection && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
          {/* This is the blank section for future use */}
          <h4>Additional Details</h4>
          <p>This section can be used to add more information about {person.name}.</p>
          {/* You can add form fields, text inputs, or any other content here for future use */}
        </div>
      )}
    </div>
  );
};
  
const Filter = ({ searchName, handleSearchName }) => {
    return (
      <div>
        SEARCH:<br/> {' '}
        <input id="searchInput" name="search" value={searchName} onChange={handleSearchName} autoComplete="off" />
      </div>
    );
  }  
  
  const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
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
              name="passportNumber" 
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
  
  const Persons = ({ persons, deleteName }) => {
    return (
      <div>
        {persons.map((person) => {
          return (
            <Names key={person.name} person={person} deleteName={deleteName} />
          )
        })}
      </div>
    )
  }
  
  export { Names, Filter, PersonForm, Persons };
  