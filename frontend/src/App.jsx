import { addStudent } from './reducers/studentReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const student = useSelector(state => state)

  const addStudent = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const passport = event.target.passport.value
    event.target.name.value = ''
    event.target.passport.value = ''
    dispatch(createStudent(name, passport))
  }

  return(
    <div>
      <form onSubmit={addStudent}>
        <input name="name" placeholder="Name" /><br />
        <input name="passport" placeholder="Passport" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {student.map(student=>
          <li 
            key={student.id}
          >
            {student.name} <br /> {student.passport}
          </li>
        )}
        </ul>
    </div>
  )
}

export default App
