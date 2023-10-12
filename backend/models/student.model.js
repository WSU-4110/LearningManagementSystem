const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    email: String,
    password: String,
    salt: String,
    firstName: String,
    lastName: String,
    courses: [mongoose.ObjectId]
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;