import { useState } from 'react'

const StudentForm = ({ createStudent }) => {
  const [newStudent, setNewStudent] = useState('')

  const addStudent = (event) => {
    event.preventDefault()
    createStudent({
      content: newStudent,
      important: true
    })

    setNewStudent('')
  }

  return (
    <div>
      <h2>Create a new Student</h2>

      <form onSubmit={addStudent}>
        <input
          value={newStudent}
          onChange={event => setNewStudent(event.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default StudentForm