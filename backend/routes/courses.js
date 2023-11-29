const router = require('express').Router();
let Course = require('../models/course.model');

// route for each CRUD operation
// [C] create a course
router.route('/').post(async (req, res) => {
    try {
        const course = await Course({
            name: req.body.course.name,
            students: req.body.course.students,
            assignments: req.body.course.assignments
        }).save();
        res.status(200).json({message: 'course created', id: course._id});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [R] get course by id
router.route('/:id').get(async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        res.status(200).json({message: 'course read', course});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [U] update a course by id (body should have desired copy of the course)
router.route('/').patch(async (req, res) => {
    try {
        let course = await Course.findById(req.body.course._id);// FIX
        course.name = req.body.course.name;
        course.students = req.body.course.students;
        course.assignments = req.body.course.assignments;
        await course.save();
        res.status(200).json({message: 'course updated'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [D] delete an assignment by id
router.route('/').delete(async (req, res) => {
    try {
        await Course.deleteOne({_id: req.body.id});
        res.status(200).json({message: 'course deleted'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

module.exports = router;