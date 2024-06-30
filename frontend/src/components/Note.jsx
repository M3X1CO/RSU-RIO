import React, { useState } from 'react';
import Notification from './Notification'; // Adjust the path if necessary

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
          <h4>Additional Details</h4>
          <p>This section can be used to add more information about {person.name}.</p>
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
};

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange, successMessage, errorMessage }) => {
  return (
    <div>
      <form onSubmit={addName}>
        <div style={{ marginBottom: '10px' }}>
          Name:<br/> 
          <input 
            id="nameInput" 
            name="name" 
            value={newName} 
            onChange={handleNameChange} 
            autoComplete="off" 
          />
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
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
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
