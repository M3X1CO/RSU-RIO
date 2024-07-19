import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Student from './Student'

test('renders content', () => {
  const student = {
    name: 'John Doe',
    passport: '123456789',
    user: { name: 'Jane Doe' },
    id: '1'
  }

  render(
    <Student
      name={student.name}
      passport={student.passport}
      user={student.user}
      deleteStudent={() => {}}
      id={student.id}
    />
  )

  screen.debug()
  const nameElement = screen.getByText(`Student's Name: ${student.name} Student's Passport Number: ${student.passport}`)
  expect(nameElement).toBeInTheDocument()

  const toggleButton = screen.getByText('Show Details')
  expect(toggleButton).toBeInTheDocument()
  screen.debug(nameElement, toggleButton)
})

test('toggles student details visibility', async () => {
    const student = {
        name: 'John Doe',
        passport: '123456789',
        user: { name: 'Jane Doe' },
        id: '1'
    }

    render(
        <Student
        name={student.name}
        passport={student.passport}
        user={student.user}
        deleteStudent={() => {}}
        id={student.id}
        />
    )

    const user = userEvent.setup()

    expect(screen.queryByText('Additional details about the student')).not.toBeInTheDocument()

    const toggleButton = screen.getByText('Show Details')
    await user.click(toggleButton)

    const detailsElement = screen.getByText('Additional details about the student')
    const createdByElement = screen.getByText('Created by: Jane Doe')
    expect(detailsElement).toBeInTheDocument()
    expect(createdByElement).toBeInTheDocument()

    await user.click(toggleButton)

    expect(screen.queryByText('Additional details about the student')).not.toBeInTheDocument()
})

test('calls deleteStudent when delete button is clicked', async () => {
    const student = {
      name: 'John Doe',
      passport: '123456789',
      user: { name: 'Jane Doe' },
      id: '1'
    }
    
    const deleteStudent = vi.fn()
  
    render(
      <Student
        name={student.name}
        passport={student.passport}
        user={student.user}
        deleteStudent={deleteStudent}
        id={student.id}
      />
    )
  
    const user = userEvent.setup()

    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)

    expect(deleteStudent).toHaveBeenCalledWith('1')
})  