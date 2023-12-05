const router = require('express').Router();
let Student = require('../models/student.model');

/* 
    this is an additional route, for a student to get their id.
    it only works when tokens are enabled, since the id is pulled out of the token.
*/
router.route('/_id').get(async (req, res) => {
    try {
        res.status(200).json({_id: req.user._id});
    } catch(err) {
        res.status(400).json({message: 'error ' + err});
    }
});

// route for each CRUD operation
// [C] create a student
router.route('/').post(async (req, res) => {
    try {
        const student = await Student(req.body.student).save();
        res.status(200).json({message: 'student created', _id: student._id});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [R] get student by id
router.route('/:_id').get(async (req, res) => {
    try {
        let student = await Student.findById(req.params._id);
        res.status(200).json({message: 'student read', student});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [U] update a student by id (body should have desired copy of the student)
router.route('/').patch(async (req, res) => {
    try {
        console.log("Received PATCH request", req.body);
        let student = await Student.findById(req.body.student._id);
        student.email = req.body.student.email;
        student.password = req.body.student.password;
        student.firstName = req.body.student.firstName;
        student.lastName = req.body.student.lastName;
        student.courses = req.body.student.courses;
        await student.save();
        res.status(200).json({message: 'student updated'});
    } catch(err) {
        res.status(400).json({message: 'error from route: ' + err});
    }
});

// [D] delete a student by id
router.route('/').delete(async (req, res) => {
    try {
        await Student.deleteOne({_id: req.body._id});
        res.status(200).json({message: 'student deleted'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

module.exports = router;