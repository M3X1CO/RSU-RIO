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
    <div className="student-form">
      <h2>Create a new Student</h2>

      <form onSubmit={addStudent}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
            placeholder="Student's Name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passport">Passport Number:</label>
          <input
            id="passport"
            type="text"
            name="passport"
            value={newStudent.passport}
            onChange={handleInputChange}
            required
            placeholder="Student's Passport Number"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  )
}

export default StudentForm
