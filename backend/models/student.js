const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  passport: {
    type: String,
    default: '0'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

studentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Student = mongoose.model('Student', studentSchema, 'RSU-RIO-DATABASE')

module.exports = Student
