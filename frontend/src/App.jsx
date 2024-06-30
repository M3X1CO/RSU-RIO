import { useState, useEffect } from 'react'
import { Names, Filter, PersonForm, Persons } from './components/Note';
import axios from 'axios'
import notes from './services/notes'
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPassportNumber, setNewPassportNumber] = useState('')
  const [searchPassportNumber, setSearchPassportNumber] = useState('')
  const [filterItems, setFilterItems] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialNotes = await notes.getAll()
        setPersons(initialNotes)
        setFilterItems(initialNotes)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])

  const addName = (event) => {
    event.preventDefault();
  
    const nameExists = persons.find((person) => person.passportNumber === newPassportNumber);
  
    if (nameExists) {
      setErrorMessage(`Person with Passport Number ${newPassportNumber} already exists`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
      return;
    }
  
    const nameObject = {
      name: newName,
      passportNumber: newPassportNumber,
    };
  
    notes.create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setFilterItems(filterItems.concat(returnedPerson));
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 4000);
      })
      .catch(error => {
        console.error('Error adding person:', error);
      });
  
    setNewName('');
    setNewPassportNumber('');
    setSearchPassportNumber('');
  };
  

  const deleteName = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if (confirmDelete) {
      notes.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setFilterItems(filterItems.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorMessage(`${person.name} has already been deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setPersons(persons.filter(person => person.id !== id))
        setFilterItems(filterItems.filter(person => person.id !== id))
      }, [])
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value) 
  }

  const handlePassportNumberChange = (event) => {
    setNewPassportNumber(event.target.value) 
  }

  const handleSearchPassportNumber = (event) => {
    setSearchPassportNumber(event.target.value)

    const filterItems = persons.filter(person => {
      if (person.passportNumber.toLowerCase().includes(event.target.value.toLowerCase())) {
        return person
      }})
    setFilterItems(filterItems)
  }

  return (
    <div>
      <h2>RSU RIO DATABASE</h2>
      <br/>
      <Notification message={successMessage} errorMessage={errorMessage} />
      <Filter 
        searchName={searchPassportNumber} 
        handleSearchName={handleSearchPassportNumber} />
      <h3>Add a New Student</h3>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newPassportNumber} 
        handleNumberChange={handlePassportNumberChange} />
      <h3>Students</h3>
      <Persons 
        persons={filterItems} 
        deleteName={deleteName} />
    </div>
  )
}

export default App
