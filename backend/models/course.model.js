const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    name: String,
    students: [mongoose.ObjectId]
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;