import React from 'react'
import './StudentFields.css'

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : 'N/A'
}

const renderDetailRow = (label, value, name, handleInputChange, isEditable) => {
  if (isEditable) {
    const inputType = name.toLowerCase().includes('date') ? 'date' : 'text'
    return (
      <tr key={name}>
        <td><label htmlFor={name}>{label}:</label></td>
        <td>
          <input
            id={name}
            type={inputType}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
            className="form-input"
          />
        </td>
      </tr>
    )
  } else {
    return (
      <tr key={name}>
        <td><strong>{label}:</strong></td>
        <td>{value || 'N/A'}</td>
      </tr>
    )
  }
}

const StudentFields = ({ student, handleInputChange, isEditable = false }) => {
  return (
    <table className="student-fields">
      <tbody>
        {renderDetailRow('Submission Date', isEditable ? student.submissionDate : formatDate(student.submissionDate), 'submissionDate', handleInputChange, isEditable)}
        {renderDetailRow('Role', student.role, 'role', handleInputChange, isEditable)}
        {renderDetailRow('First Name', student.firstName, 'firstName', handleInputChange, isEditable)}
        {renderDetailRow('Middle Name', student.middleName, 'middleName', handleInputChange, isEditable)}
        {renderDetailRow('Last Name', student.lastName, 'lastName', handleInputChange, isEditable)}
        {renderDetailRow('Submission ID', student.submissionId, 'submissionId', handleInputChange, isEditable)}
        {renderDetailRow('Date of Birth', isEditable ? student.dateOfBirth : formatDate(student.dateOfBirth), 'dateOfBirth', handleInputChange, isEditable)}
        {renderDetailRow('Original Passport Number', student.originalPassportNumber, 'originalPassportNumber', handleInputChange, isEditable)}
        {renderDetailRow('New Passport Number', student.newPassportNumber, 'newPassportNumber', handleInputChange, isEditable)}
        {renderDetailRow('Contact Address', student.contactAddress, 'contactAddress', handleInputChange, isEditable)}
        {renderDetailRow('Program Applied', student.programApplied, 'programApplied', handleInputChange, isEditable)}
        {renderDetailRow('Faculty / College', student.facultyCollege, 'facultyCollege', handleInputChange, isEditable)}
        {renderDetailRow('Semester Intake', student.semesterIntake, 'semesterIntake', handleInputChange, isEditable)}
        {renderDetailRow('Academic Year Intake', student.academicYearIntake, 'academicYearIntake', handleInputChange, isEditable)}
        {renderDetailRow('Deposit Amount', student.depositAmount, 'depositAmount', handleInputChange, isEditable)}
        {renderDetailRow('Less Payment Amount', student.lessPaymentAmount, 'lessPaymentAmount', handleInputChange, isEditable)}
        {renderDetailRow('Program Duration', student.programDuration, 'programDuration', handleInputChange, isEditable)}
        {renderDetailRow('Mode of Study', student.modeOfStudy, 'modeOfStudy', handleInputChange, isEditable)}
        {renderDetailRow('Class Start Date', isEditable ? student.classStartDate : formatDate(student.classStartDate), 'classStartDate', handleInputChange, isEditable)}
        {renderDetailRow('Class End Date', isEditable ? student.classEndDate : formatDate(student.classEndDate), 'classEndDate', handleInputChange, isEditable)}
        {renderDetailRow('VISA Submission Place 1', student.visaSubmissionPlace1, 'visaSubmissionPlace1', handleInputChange, isEditable)}
        {renderDetailRow('VISA Submission Place 2', student.visaSubmissionPlace2, 'visaSubmissionPlace2', handleInputChange, isEditable)}
        {renderDetailRow('Issue Number', student.issueNumber, 'issueNumber', handleInputChange, isEditable)}
        {renderDetailRow('Date of Issue Acceptance letter', isEditable ? student.dateOfIssueAcceptanceLetter : formatDate(student.dateOfIssueAcceptanceLetter), 'dateOfIssueAcceptanceLetter', handleInputChange, isEditable)}
        {renderDetailRow('1st money transfer', student.firstMoneyTransfer, 'firstMoneyTransfer', handleInputChange, isEditable)}
        {renderDetailRow('2nd money transfer', student.secondMoneyTransfer, 'secondMoneyTransfer', handleInputChange, isEditable)}
        {renderDetailRow('Notes', student.notes, 'notes', handleInputChange, isEditable)}
        {!isEditable && student.user && renderDetailRow('Created by', student.user.name, 'createdBy', handleInputChange, isEditable)}
      </tbody>
    </table>
  )
}

export default StudentFields