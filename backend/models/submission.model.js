const mongoose = require('mongoose');
const submissionSchema = mongoose.Schema({
    student_id: mongoose.ObjectId,
    grade: Number,
    comment: String,
    filePath: String
});
const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;