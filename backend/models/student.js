const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  passport: {
    type: String,
    required: true,
    minlength: 5
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
