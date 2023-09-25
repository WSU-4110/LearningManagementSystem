const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    name: String
});

const Student = mongoose.Model('Student', studentSchema);
module.exports = Student;