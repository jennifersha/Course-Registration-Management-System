const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  coursePayment: { type: String, enum: ['paid', 'pending', 'not_paid'], required: true },
  residence: { type: String, required: true },
  cityAccessPermit: { type: Boolean, default: false },
  courseRegistration: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

// Indexing for efficient querying
studentSchema.index({ name: 1, residence: 1, courseRegistration: 1 });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
