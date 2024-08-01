import { useDispatch } from 'react-redux'
import { addStudent } from '../reducers/studentReducer'

const NewStudent = () => {
    const dispatch = useDispatch()

    const addStudent = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const passport = event.target.passport.value
        event.target.name.value = ''
        event.target.passport.value = ''
        dispatch(createStudent(name, passport))
    }

    return (
        <form onSubmit={addStudent}>
            <input name="name" placeholder="Name" /><br />
            <input name="passport" placeholder="Passport" />
            <button type="submit">Add</button>
        </form>
    )
}

export default NewStudent