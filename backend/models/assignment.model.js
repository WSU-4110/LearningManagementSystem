const mongoose = require('mongoose');
const assignmentSchema = mongoose.Schema({
    name: String,
    duaDate: Date,
    content: String
});
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;