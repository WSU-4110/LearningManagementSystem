const mongoose = require('mongoose');
const instructorSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    courses: [mongoose.ObjectId]
});
const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;