import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Filter, StudentForm, Students } from './components/Student';
import Pages from './components/Pages';
import studentsService from './services/students';
import Notification from './components/Notification';
import loginService from './services/login';

const App = () => {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPassportNumber, setNewPassportNumber] = useState('');
  const [searchPassportNumber, setSearchPassportNumber] = useState('');
  const [filterItems, setFilterItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedStudentappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      studentsService.setToken(user.token);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch students when user logs in or when isLoggedIn changes
      studentsService
        .getAll()
        .then(initialStudents => {
          setStudents(initialStudents);
          setFilterItems(initialStudents); // Initialize filterItems with all students
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    }
  }, [isLoggedIn]); // Watch for changes in isLoggedIn state

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
        // Update the state with the new student
        setStudents([...students, returnedStudent]);

        // Update filterItems to include the new student if it matches the filter
        const updatedFilterItems = [...filterItems];
        if (returnedStudent.passport.toLowerCase().includes(searchPassportNumber.toLowerCase())) {
          updatedFilterItems.push(returnedStudent);
        }
        setFilterItems(updatedFilterItems);

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
          // Update students state by filtering out the deleted student
          setStudents(students.filter(student => student.id !== id));

          // Update filterItems state by filtering out the deleted student
          setFilterItems(filterItems.filter(student => student.id !== id));
        })
        .catch(error => {
          setErrorMessage(`${student.name} has already been deleted from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
          // Still update UI optimistically if the server request fails
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
    const searchTerm = event.target.value.toLowerCase();

    setSearchPassportNumber(searchTerm);

    // Filter students based on the search term and update filterItems state
    const filteredItems = students.filter(student => {
      if (student.passport) {
        return student.passport.toLowerCase().includes(searchTerm);
      }
      return false;
    });

    setFilterItems(filteredItems);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      });
      window.localStorage.setItem(
        'loggedStudentappUser', JSON.stringify(user)
      );
      studentsService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setIsLoggedIn(true);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage and reset state
    window.localStorage.removeItem('loggedStudentappUser');
    studentsService.setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const studentForm = () => (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Filter
              searchPassportNumber={searchPassportNumber}
              handleSearchPassportNumber={handleSearchPassportNumber}
            />
            <h3>Add a New Student</h3>
            <StudentForm
              addName={addName}
              newName={newName}
              handleNameChange={handleNameChange}
              newNumber={newPassportNumber}
              handleNumberChange={handlePassportNumberChange}
            />
          </>
        }
      />
      <Route path="/students/:id" element={<Pages students={students} />} />
    </Routes>
  );

  const renderStudentList = () => (
    <div>
      <h2>Student List</h2>
      {filterItems.length > 0 ? (
        <Students students={filterItems} deleteName={deleteName} />
      ) : (
        <Students students={students} deleteName={deleteName} />
      )}
    </div>
  );

  return (
    <Router>
      <div>
        <h1>{isLoggedIn ? 'RSU RIO DATABASE' : 'Login'}</h1>
        <br />
        <Notification message={successMessage} errorMessage={errorMessage} />

        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p className="logged-in">
              {user.name} logged-in <button onClick={handleLogout}>Logout</button>
            </p>
            {studentForm()}
          </div>
        )}

        {isLoggedIn && renderStudentList()}
      </div>
    </Router>
  );
};

export default App;
