import React from 'react';
import Header from './components/Header';
import Notification from './components/Notification';
import LoginFormWrapper from './components/LoginFormWrapper';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Notification message={errorMessage} />

      <main className="main-content">
        {!user && <LoginFormWrapper handleLogin={login} />}
        {user && (
          <MainContent
            user={user}
            studentFormRef={studentFormRef}
            addStudent={addStudent}
            students={filteredStudents}
            deleteStudent={deleteStudent}
            updateStudent={updateStudent}
            oldPassportSearch={oldPassportSearch}
            newPassportSearch={newPassportSearch}
            setOldPassportSearch={setOldPassportSearch}
            setNewPassportSearch={setNewPassportSearch}
          />
        )}
      </main>

      <Footer addStudent={addStudent} user={user} logout={logout} />
    </div>
  );
};

export default App;
