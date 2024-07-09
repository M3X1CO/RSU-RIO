const Student = require('../models/student')

const initialStudents = [
  {
    name: 'Tony',
    passport: 'anything',
  },
  {
    name: 'Tony2',
    passport: 'anything2',
  },
]

const nonExistingId = async () => {
  const student = new Student({ name: 'willremovethissoon', passport: 'willremovethissoon' })
  await student.save()
  await student.deleteOne()

  return student._id.toString()
}

const studentsInDb = async () => {
  const students = await Student.find({})
  return students.map(student => student.toJSON())
}

module.exports = {
  initialStudents,
  nonExistingId,
  studentsInDb
}
