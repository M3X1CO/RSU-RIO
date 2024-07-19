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
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
            placeholder="Student's Name"
          />
        </div>
        <div>
          <label htmlFor="passport">Passport Number:</label>
          <input
            id="passport"
            type="text"
            name="passport"
            value={newStudent.passport}
            onChange={handleInputChange}
            required
            placeholder="Student's Passport Number"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default StudentForm
