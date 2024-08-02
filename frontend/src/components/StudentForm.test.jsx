import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import StudentForm from './StudentForm'

test('calls createStudent with the right details when a new student is created', async () => {
  const createStudent = vi.fn()
  const user = userEvent.setup()

  render(<StudentForm createStudent={createStudent} />)

  const nameInput = screen.getByLabelText('Name:')
  const passportInput = screen.getByLabelText('Passport Number:')
  const saveButton = screen.getByText('Save')

  await user.type(nameInput, 'John Doe')
  await user.type(passportInput, '123456789')
  await user.click(saveButton)

  expect(createStudent).toHaveBeenCalledTimes(1)
  expect(createStudent).toHaveBeenCalledWith({
    name: 'John Doe',
    passport: '123456789'
  })

  expect(nameInput.value).toBe('')
  expect(passportInput.value).toBe('')
})