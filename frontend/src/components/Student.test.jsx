import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect } from 'vitest'
import Student from './Student'

test('renders student content', () => {
  const student = {
    name: 'John Doe',
    passport: '123456789',
    user: { name: 'Jane Doe' },
    id: '1'
  }

  render(<Student student={student} handleDelete={() => {}} />)

  // Check that the student's name label and value are displayed
  expect(screen.getByText(/Student's Name:/)).toBeInTheDocument()
  expect(screen.getByText(student.name)).toBeInTheDocument()

  // Check that the student's passport number label and value are displayed
  expect(screen.getByText(/Student's Passport Number:/)).toBeInTheDocument()
  expect(screen.getByText(student.passport)).toBeInTheDocument()

  // Check that the "Show Details" button is rendered
  expect(screen.getByText('Show Details')).toBeInTheDocument()
})

test('shows and hides details when button is clicked', () => {
  const student = {
    name: 'John Doe',
    passport: '123456789',
    user: { name: 'Jane Doe' },
    id: '1'
  }

  render(<Student student={student} handleDelete={() => {}} />)

  // Initially, details should be hidden
  expect(screen.queryByText('Additional details about the student')).toBeNull()

  // Click the button to show details
  fireEvent.click(screen.getByText('Show Details'))
  expect(screen.getByText('Additional details about the student')).toBeInTheDocument()
  expect(screen.getByText(`Created by: ${student.user.name}`)).toBeInTheDocument()

  // Click the button to hide details
  fireEvent.click(screen.getByText('Hide Details'))
  expect(screen.queryByText('Additional details about the student')).toBeNull()
})

test('calls handleDelete with correct id when delete button is clicked', () => {
  const student = {
    name: 'John Doe',
    passport: '123456789',
    user: { name: 'Jane Doe' },
    id: '1'
  }

  // Mock handleDelete function and window.confirm
  const handleDelete = (id) => {
    expect(id).toBe(student.id)
  }
  window.confirm = () => true

  render(<Student student={student} handleDelete={handleDelete} />)
  
  // Click the delete button
  fireEvent.click(screen.getByText('Delete'))
})