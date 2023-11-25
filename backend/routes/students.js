const router = require('express').Router();
const bcrypt = require('bcrypt');
let Student = require('../models/student.model');
router.route('/').get(async (req, res) => {
    try {
        let students = await Student.find();
        res.json(students);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
router.route('/getCourses').get(async (req, res) => {
    try {
        const student = await Student.findById(req.user._id);
        res.json(student.courses);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
router.route('/addCourse').post(async (req, res) => {
    try {
        const student = await Student.findById(req.body.studentId);
        student.courses.push(req.body.courseId);
        student.save();
        res.json('course added to student');
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
router.route('/:id').get(async (req, res) => {
    try {
        let student = await Student.findById(req.params.id);
        res.json(student);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
module.exports = router;