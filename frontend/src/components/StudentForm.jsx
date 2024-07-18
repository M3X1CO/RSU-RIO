import { useState } from 'react'

const StudentForm = ({ createStudent }) => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    passport: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewStudent({
      ...newStudent,
      [name]: value
    })
  }

  const addStudent = (event) => {
    event.preventDefault()
    createStudent(newStudent)

    setNewStudent({
      name: '',
      passport: ''
    })
  }

  return (
    <div>
      <h2>Create a new Student</h2>

      <form onSubmit={addStudent}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Passport Number:</label>
          <input
            type="text"
            name="passport"
            value={newStudent.passport}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default StudentForm
