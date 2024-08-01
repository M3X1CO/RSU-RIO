import NewStudent from './components/StudentForm';
import Students from './components/StudentList';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {

  return (
    <div>
      <h2>Add a Student</h2>
      <NewStudent />
      <VisibilityFilter />
      <h2>Current Students</h2>
      <Students />
    </div>
  );
};

export default App;