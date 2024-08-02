const mongoose = require('mongoose');
const studentFields = require('../utils/studentFields');

const studentSchema = new mongoose.Schema({
  ...studentFields,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

studentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Student', studentSchema, 'RSU-RIO-DATABASE');