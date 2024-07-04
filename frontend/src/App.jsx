import React, { useState, useEffect } from 'react';
import { Names, Filter, StudentForm, Students } from './components/Student';
import studentsService from './services/students';
import Notification from './components/Notification';

const App = () => {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPassportNumber, setNewPassportNumber] = useState('');
  const [searchPassportNumber, setSearchPassportNumber] = useState('');
  const [filterItems, setFilterItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialStudents = await studentsService.getAll();
        setStudents(initialStudents);
        setFilterItems(initialStudents);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const studentExists = students.find((student) => student.passport === newPassportNumber);

    if (studentExists) {
      setErrorMessage(`Student with Passport Number ${newPassportNumber} already exists`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
      return;
    }

    const studentObject = {
      name: newName,
      passport: newPassportNumber,
    };

    studentsService.create(studentObject)
      .then(returnedStudent => {
        setStudents([...students, returnedStudent]);
        setFilterItems([...filterItems, returnedStudent]);
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 4000);
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });

    setNewName('');
    setNewPassportNumber('');
    setSearchPassportNumber('');
  };

  const deleteName = (id) => {
    const student = students.find(student => student.id === id);
    const confirmDelete = window.confirm(`Delete ${student.name}?`);
    if (confirmDelete) {
      studentsService.remove(id)
        .then(() => {
          setStudents(students.filter(student => student.id !== id));
          setFilterItems(filterItems.filter(student => student.id !== id));
        })
        .catch(error => {
          setErrorMessage(`${student.name} has already been deleted from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
          setStudents(students.filter(student => student.id !== id));
          setFilterItems(filterItems.filter(student => student.id !== id));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePassportNumberChange = (event) => {
    setNewPassportNumber(event.target.value);
  };

  const handleSearchPassportNumber = (event) => {
    setSearchPassportNumber(event.target.value);

    const filteredItems = students.filter(student => {
      return student.passport.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilterItems(filteredItems);
  };

  return (
    <div>
      <h2>RSU RIO DATABASE</h2>
      <br/>
      <Notification message={successMessage} errorMessage={errorMessage} />
      <Filter 
        searchPassportNumber={searchPassportNumber} 
        handleSearchPassportNumber={handleSearchPassportNumber} />
      <h3>Add a New Student</h3>
      <StudentForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newPassportNumber} 
        handleNumberChange={handlePassportNumberChange} />
      <h3>Students</h3>
      <Students 
        students={filterItems} 
        deleteName={deleteName} />
    </div>
  );
};

export default App;
