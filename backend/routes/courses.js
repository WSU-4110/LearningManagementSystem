const router = require('express').Router();
let Course = require('../models/course.model');
const Assignment = require('../models/assignment.model');

// routes
// get all courses (only used for testing)
router.route('/').get(async (req, res) => {
    try {
        let courses = await Course.find();
        res.json(courses);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
// get course by _id
router.route('/:id').get(async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        res.json(course);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
// add an assignment to a course by _id (of the course)
router.route('/addAssignment/:id').patch(async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        course.assignments.push(Assignment(req.body.assignment));
        await course.save();
        res.json('assignment added!');
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
// add a new course
router.route('/add').post(async (req, res) => {
    try {
        await Course({ name: req.body.name }).save();
        res.json('course added!');
    } catch(err) {
        res.status(400).json('error: ' + err)
    }
});
// add a student (by _id) to the course by _id (of the course)
router.route('/addStudent').post(async (req, res) => {
    try {
        const course = await Course.findById(req.body.courseId);
        course.students.push(req.body.newStudentId);
        course.save();
        res.json('student added to course');
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
// delete a student (by _id) from the course by _id (of the course)
router.route('/deleteStudent').delete(async (req, res) => {
    try {
        const course = await Course.findById(req.body.courseId);
        course.students.remove(req.body.studentId);
        course.save();
        res.json('student deleted from course');
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
module.exports = router;