const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    email: String,
    password: String,
    salt: String
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;