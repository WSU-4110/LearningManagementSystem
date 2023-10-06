const router = require('express').Router();
let Course = require('../models/course.model')
router.route('/').get(async (req, res) => {
    try {
        let courses = await Course.find();
        res.json(courses);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const newCourse = Course({ name: name });
    newCourse.save()
        .then(() => res.json('course added!'))
        .catch(err => res.status(400).json('error: ' + err));
});
router.route('/addStudent').post((req, res) => {
    const newStudentId = req.body.newStudentId;
    const courseId = req.body.courseId;
    Course.findById(courseId)
        .then(course => { 
            course.students.push(newStudentId);
            course.save();
            res.json('student added to course')
        })
        .catch(err => res.status(400).json('error: ' + err));
});
router.route('/deleteStudent').delete((req, res) => {
    const studentId = req.body.studentId;
    const courseId = req.body.courseId;
    Course.findById(courseId)
        .then((course) => {
            course.students.remove(studentId);
            course.save();
            res.json('student deleted from coruse')
        })
        .catch(err => res.status(400).json('error: ' + err));
});
module.exports = router;