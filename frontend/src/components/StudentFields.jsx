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
        {renderDetailRow('Full Name', student.name, 'name', handleInputChange, isEditable)}
        {renderDetailRow('Sex', student.sex, 'sex', handleInputChange, isEditable)}
        {renderDetailRow('Date of Birth', isEditable ? student.dateOfBirth : formatDate(student.dateOfBirth), 'dateOfBirth', handleInputChange, isEditable)}
        {renderDetailRow('Old Nationality', student.oldNationality, 'oldNationality', handleInputChange, isEditable)}
        {renderDetailRow('Nationality', student.nationality, 'nationality', handleInputChange, isEditable)}
        {renderDetailRow('Place of Birth', student.placeOfBirth, 'placeOfBirth', handleInputChange, isEditable)}
        {renderDetailRow('Thai ID Number', student.thaiIdNumber, 'thaiIdNumber', handleInputChange, isEditable)}
        {renderDetailRow('Status', student.status, 'status', handleInputChange, isEditable)}
        {renderDetailRow('Original Passport/Thai ID', student.originalPassportOrThaiId, 'originalPassportOrThaiId', handleInputChange, isEditable)}
        {renderDetailRow('New Passport Number', student.newPassportNumber, 'newPassportNumber', handleInputChange, isEditable)}
        {renderDetailRow('Issue Date', isEditable ? student.issueDate : formatDate(student.issueDate), 'issueDate', handleInputChange, isEditable)}
        {renderDetailRow('Old Expiration Date', isEditable ? student.expirationDateOld : formatDate(student.expirationDateOld), 'expirationDateOld', handleInputChange, isEditable)}
        {renderDetailRow('Expiration Date', isEditable ? student.expirationDate : formatDate(student.expirationDate), 'expirationDate', handleInputChange, isEditable)}
        {renderDetailRow('Email Address', student.emailAddress, 'emailAddress', handleInputChange, isEditable)}
        {renderDetailRow('Telephone Number', student.telephoneNumber, 'telephoneNumber', handleInputChange, isEditable)}
        {renderDetailRow('WhatsApp Number', student.whatsappNumber, 'whatsappNumber', handleInputChange, isEditable)}
        {renderDetailRow('QQ Number', student.qqNumber, 'qqNumber', handleInputChange, isEditable)}
        {renderDetailRow('Line ID', student.lineId, 'lineId', handleInputChange, isEditable)}
        {renderDetailRow('Street Address', student.streetAddress, 'streetAddress', handleInputChange, isEditable)}
        {renderDetailRow('Street Address Line 2', student.streetAddressLine2, 'streetAddressLine2', handleInputChange, isEditable)}
        {renderDetailRow('City', student.city, 'city', handleInputChange, isEditable)}
        {renderDetailRow('State/Province', student.stateOrProvince, 'stateOrProvince', handleInputChange, isEditable)}
        {renderDetailRow('Postal/Zip Code', student.postalOrZipCode, 'postalOrZipCode', handleInputChange, isEditable)}
        {renderDetailRow('Country', student.country, 'country', handleInputChange, isEditable)}
        {renderDetailRow('Emergency Contact First Name', student.emergencyContactFirstName, 'emergencyContactFirstName', handleInputChange, isEditable)}
        {renderDetailRow('Emergency Contact Middle Name', student.emergencyContactMiddleName, 'emergencyContactMiddleName', handleInputChange, isEditable)}
        {renderDetailRow('Emergency Contact Last Name', student.emergencyContactLastName, 'emergencyContactLastName', handleInputChange, isEditable)}
        {renderDetailRow('Relationship', student.relationship, 'relationship', handleInputChange, isEditable)}
        {renderDetailRow('Street Address 2', student.streetAddress2, 'streetAddress2', handleInputChange, isEditable)}
        {renderDetailRow('Street Address Line 2 (2)', student.streetAddressLine2_2, 'streetAddressLine2_2', handleInputChange, isEditable)}
        {renderDetailRow('City 2', student.city2, 'city2', handleInputChange, isEditable)}
        {renderDetailRow('State/Province 2', student.stateOrProvince2, 'stateOrProvince2', handleInputChange, isEditable)}
        {renderDetailRow('Postal/Zip Code 2', student.postalOrZipCode2, 'postalOrZipCode2', handleInputChange, isEditable)}
        {renderDetailRow('Country 2', student.country2, 'country2', handleInputChange, isEditable)}
        {renderDetailRow('Email Address 2', student.emailAddress2, 'emailAddress2', handleInputChange, isEditable)}
        {renderDetailRow('Telephone Number 2', student.telephoneNumber2, 'telephoneNumber2', handleInputChange, isEditable)}
        {renderDetailRow('City 3', student.city3, 'city3', handleInputChange, isEditable)}
        {renderDetailRow('State/Province 3', student.stateOrProvince3, 'stateOrProvince3', handleInputChange, isEditable)}
        {renderDetailRow('Postal/Zip Code 3', student.postalOrZipCode3, 'postalOrZipCode3', handleInputChange, isEditable)}
        {renderDetailRow('Country 3', student.country3, 'country3', handleInputChange, isEditable)}
        {renderDetailRow('Qualification Institute Country', student.qualificationInstituteCountry, 'qualificationInstituteCountry', handleInputChange, isEditable)}
        {renderDetailRow('Country of School', student.countryOfSchool, 'countryOfSchool', handleInputChange, isEditable)}
        {renderDetailRow('GPA', student.gpa, 'gpa', handleInputChange, isEditable)}
        {renderDetailRow('Year of Graduation', isEditable ? student.yearOfGraduation : formatDate(student.yearOfGraduation), 'yearOfGraduation', handleInputChange, isEditable)}
        {renderDetailRow('Is Former RSU Student', student.isFormerRsuStudent, 'isFormerRsuStudent', handleInputChange, isEditable)}
        {renderDetailRow('Term/Year Last Attended RSU', student.termYearLastAttendedRsu, 'termYearLastAttendedRsu', handleInputChange, isEditable)}
        {renderDetailRow('Applying For', student.applyingFor, 'applyingFor', handleInputChange, isEditable)}
        {renderDetailRow('Status 2', student.status2, 'status2', handleInputChange, isEditable)}
        {renderDetailRow('Bachelor Programs', student.bachelorPrograms, 'bachelorPrograms', handleInputChange, isEditable)}
        {renderDetailRow('Master Programs', student.masterPrograms, 'masterPrograms', handleInputChange, isEditable)}
        {renderDetailRow('Doctoral Degrees', student.doctoralDegrees, 'doctoralDegrees', handleInputChange, isEditable)}
        {renderDetailRow('Semester Applying For', student.semesterApplyingFor, 'semesterApplyingFor', handleInputChange, isEditable)}
        {renderDetailRow('One Inch Photo', student.oneInchPhoto, 'oneInchPhoto', handleInputChange, isEditable)}
        {renderDetailRow('Passport Copies', student.passportCopies, 'passportCopies', handleInputChange, isEditable)}
        {renderDetailRow('Portfolio of Creative Work', student.portfolioOfCreativeWork, 'portfolioOfCreativeWork', handleInputChange, isEditable)}
        {renderDetailRow('Original Transcript Copy', student.originalTranscriptCopy, 'originalTranscriptCopy', handleInputChange, isEditable)}
        {renderDetailRow('Original Certificate Copy', student.originalCertificateCopy, 'originalCertificateCopy', handleInputChange, isEditable)}
        {renderDetailRow('General Examination Results', student.generalExaminationResults, 'generalExaminationResults', handleInputChange, isEditable)}
        {renderDetailRow('Entrance Examination Results', student.entranceExaminationResults, 'entranceExaminationResults', handleInputChange, isEditable)}
        {renderDetailRow('TOEFL or IELTS', student.toeflOrIelts, 'toeflOrIelts', handleInputChange, isEditable)}
        {renderDetailRow('Visa Submission Place', student.visaSubmissionPlace, 'visaSubmissionPlace', handleInputChange, isEditable)}
        {renderDetailRow('Assistant First Name', student.assistantFirstName, 'assistantFirstName', handleInputChange, isEditable)}
        {renderDetailRow('Assistant Middle Name', student.assistantMiddleName, 'assistantMiddleName', handleInputChange, isEditable)}
        {renderDetailRow('Assistant Last Name', student.assistantLastName, 'assistantLastName', handleInputChange, isEditable)}
        {renderDetailRow('Relation to Applicant', student.relationToApplicant, 'relationToApplicant', handleInputChange, isEditable)}
        {renderDetailRow('Assistant Email', student.assistantEmail, 'assistantEmail', handleInputChange, isEditable)}
        {renderDetailRow('Phone Number', student.phoneNumber, 'phoneNumber', handleInputChange, isEditable)}
        {renderDetailRow('Postal Address for Documentation', student.postalAddressForDocumentation, 'postalAddressForDocumentation', handleInputChange, isEditable)}
        {renderDetailRow('Street Address 3', student.streetAddress3, 'streetAddress3', handleInputChange, isEditable)}
        {renderDetailRow('Street Address Line 2 (3)', student.streetAddressLine2_3, 'streetAddressLine2_3', handleInputChange, isEditable)}
        {renderDetailRow('City 4', student.city4, 'city4', handleInputChange, isEditable)}
        {renderDetailRow('State/Province 4', student.stateOrProvince4, 'stateOrProvince4', handleInputChange, isEditable)}
        {renderDetailRow('Postal/Zip Code 4', student.postalOrZipCode4, 'postalOrZipCode4', handleInputChange, isEditable)}
        {renderDetailRow('Country 4', student.country4, 'country4', handleInputChange, isEditable)}
        {renderDetailRow('Representative First Name', student.representativeFirstName, 'representativeFirstName', handleInputChange, isEditable)}
        {renderDetailRow('Representative Middle Name', student.representativeMiddleName, 'representativeMiddleName', handleInputChange, isEditable)}
        {renderDetailRow('Representative Last Name', student.representativeLastName, 'representativeLastName', handleInputChange, isEditable)}
        {renderDetailRow('Representative Email', student.representativeEmail, 'representativeEmail', handleInputChange, isEditable)}
        {renderDetailRow('Phone Number 2', student.phoneNumber2, 'phoneNumber2', handleInputChange, isEditable)}
        {renderDetailRow('Street Address 4', student.streetAddress4, 'streetAddress4', handleInputChange, isEditable)}
        {renderDetailRow('Street Address Line 2 (4)', student.streetAddressLine2_4, 'streetAddressLine2_4', handleInputChange, isEditable)}
        {renderDetailRow('City 5', student.city5, 'city5', handleInputChange, isEditable)}
        {renderDetailRow('State/Province 5', student.stateOrProvince5, 'stateOrProvince5', handleInputChange, isEditable)}
        {renderDetailRow('Postal/Zip Code 5', student.postalOrZipCode5, 'postalOrZipCode5', handleInputChange, isEditable)}
        {renderDetailRow('Country 5', student.country5, 'country5', handleInputChange, isEditable)}
        {renderDetailRow('Remarks', student.remarks, 'remarks', handleInputChange, isEditable)}
        {renderDetailRow('Specify Disability', student.specifyDisability, 'specifyDisability', handleInputChange, isEditable)}
        {renderDetailRow('Emergency Evacuation Help', student.emergencyEvacuationHelp, 'emergencyEvacuationHelp', handleInputChange, isEditable)}
        {renderDetailRow('Additional Resources', student.additionalResources, 'additionalResources', handleInputChange, isEditable)}
        {renderDetailRow('Additional Resources Details', student.additionalResourcesDetails, 'additionalResourcesDetails', handleInputChange, isEditable)}
        {renderDetailRow('How Did You Know About RSU', student.howDidYouKnowAboutRsu, 'howDidYouKnowAboutRsu', handleInputChange, isEditable)}
        {renderDetailRow('Confirmation', student.confirmation, 'confirmation', handleInputChange, isEditable)}
        {renderDetailRow('Terms and Conditions', student.termsAndConditions, 'termsAndConditions', handleInputChange, isEditable)}
        {renderDetailRow('Submission ID', student.submissionId, 'submissionId', handleInputChange, isEditable)}
        {renderDetailRow('Program Applied', student.programApplied, 'programApplied', handleInputChange, isEditable)}
        {renderDetailRow('Faculty/College', student.facultyOrCollege, 'facultyOrCollege', handleInputChange, isEditable)}
        {renderDetailRow('Semester Intake', student.semesterIntake, 'semesterIntake', handleInputChange, isEditable)}
        {renderDetailRow('Academic Year Intake', student.academicYearIntake, 'academicYearIntake', handleInputChange, isEditable)}
        {renderDetailRow('Total Amount', student.totalAmount, 'totalAmount', handleInputChange, isEditable)}
        {renderDetailRow('Deposit Amount', student.depositAmount, 'depositAmount', handleInputChange, isEditable)}
        {renderDetailRow('Less Payment Amount', student.lessPaymentAmount, 'lessPaymentAmount', handleInputChange, isEditable)}
        {renderDetailRow('Program Duration', student.programDuration, 'programDuration', handleInputChange, isEditable)}
        {renderDetailRow('Mode of Study', student.modeOfStudy, 'modeOfStudy', handleInputChange, isEditable)}
        {renderDetailRow('Class Start Date', isEditable ? student.classStartDate : formatDate(student.classStartDate), 'classStartDate', handleInputChange, isEditable)}
        {renderDetailRow('Class End Date', isEditable ? student.classEndDate : formatDate(student.classEndDate), 'classEndDate', handleInputChange, isEditable)}
        {renderDetailRow('Visa Submission Place 1', student.visaSubmissionPlace1, 'visaSubmissionPlace1', handleInputChange, isEditable)}
        {renderDetailRow('Visa Submission Place 2', student.visaSubmissionPlace2, 'visaSubmissionPlace2', handleInputChange, isEditable)}
        {renderDetailRow('Document Number', student.documentNumber, 'documentNumber', handleInputChange, isEditable)}
        {renderDetailRow('Acceptance Letter Issue Date', isEditable ? student.acceptanceLetterIssueDate : formatDate(student.acceptanceLetterIssueDate), 'acceptanceLetterIssueDate', handleInputChange, isEditable)}
        {renderDetailRow('First Payment Transfer', student.firstPaymentTransfer, 'firstPaymentTransfer', handleInputChange, isEditable)}
        {renderDetailRow('Second Payment Transfer', student.secondPaymentTransfer, 'secondPaymentTransfer', handleInputChange, isEditable)}
        {renderDetailRow('Remarks 2', student.remarks2, 'remarks2', handleInputChange, isEditable)}
        {!isEditable && student.user && renderDetailRow('Created by', student.user.name, 'createdBy', handleInputChange, isEditable)}
      </tbody>
    </table>
  )
}

export default StudentFields