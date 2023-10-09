const mongoose = require('mongoose');
const assignmentSchema = mongoose.Schema({
    name: String,
    duaData: Date,
    content: String
});
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;