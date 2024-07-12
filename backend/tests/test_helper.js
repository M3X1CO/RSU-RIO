const Student = require('../models/student')
const User = require('../models/user')

const initialStudents = [
  {
    name: 'Tonyis',
    passport: 'anything',
  },
  {
    name: 'Tonywas',
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialStudents,
  nonExistingId,
  studentsInDb,
  usersInDb,
}
