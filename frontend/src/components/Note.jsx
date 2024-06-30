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
        <input value={searchName} onChange={handleSearchName} />
      </div>
    )
  }
  
  const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
      <div>
        <form onSubmit={addName}>
          <div style={{ marginBottom: '10px' }}>
            Name:<br/> <input value={newName} onChange={handleNameChange} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            Passport Number:<br/> <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }  
  
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
  