const mongoose = require('mongoose');
const Assignment = require('./assignment.model');
const courseSchema = mongoose.Schema({
    name: String,
    students: [mongoose.ObjectId],
    assignments: [mongoose.ObjectId]
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;