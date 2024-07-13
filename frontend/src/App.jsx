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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedStudentappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      studentsService.setToken(user.token);
    }
  }, []);

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
    const searchTerm = event.target.value.toLowerCase();

    setSearchPassportNumber(searchTerm);

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
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
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
  )

  const renderStudentList = () => {
    <div>
      <h2>Studnet List</h2>
      <Students 
        students={filterItems} 
        deleteName={deleteName} 
      />
  </div>
  }

  return (
    <Router>
      <div>
        <h2>RSU RIO DATABASE</h2>
        <br/>
        <Notification message={successMessage} errorMessage={errorMessage} />

        {user === null ?
        loginForm() :
        <div>
          <p className="logged-in">{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
          {studentForm()}
        </div>
        }
        
        {isLoggedIn && renderStudentList()}
      </div>
    </Router>
  );
};

export default App;
