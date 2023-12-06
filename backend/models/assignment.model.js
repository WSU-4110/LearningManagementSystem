const mongoose = require('mongoose');
const assignmentSchema = mongoose.Schema({
    name: String,
    dueDate: Date,
    content: String,
    submissions: [mongoose.ObjectId],
    max_points: Number
});
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
