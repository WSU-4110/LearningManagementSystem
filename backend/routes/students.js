const router = require('express').Router();
let Student = require('../models/student.model');

/* 
    this is an additional route, for a student to get their id.
    it only works when tokens are enabled, since the id is pulled out of the token.
*/
router.route('/id').get(async (req, res) => {
    try {
        res.status(200).json({id: req.user._id});
    } catch(err) {
        res.status(400).json({message: 'error ' + err});
    }
});

// route for each CRUD operation
// [C] create a student
router.route('/').post(async (req, res) => {
    try {
        const student = await Student({
            email: req.body.student.email,
            password: req.body.student.password,
            firstName: req.body.student.firstName,
            lastName: req.body.student.lastName,
            courses: req.body.student.courses
        }).save();
        res.status(200).json({message: 'student created', id: student._id});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [R] get student by id
router.route('/:id').get(async (req, res) => {
    try {
        let student = await Student.findById(req.params.id);
        res.status(200).json({message: 'student read', student});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [U] update a student by id (body should have desired copy of the student)
router.route('/').patch(async (req, res) => {
    try {
        let student = await Student.findById(req.body.id);
        student.email = req.body.student.name;
        student.password = req.body.student.password;
        student.firstName = req.body.student.firstName;
        student.lastName = req.body.student.lastName;
        student.courses = req.body.student.courses;
        await student.save();
        res.status(200).json({message: 'student updated'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [D] delete a student by id
router.route('/').delete(async (req, res) => {
    try {
        await Student.deleteOne({_id: req.body.id});
        res.status(200).json({message: 'student deleted'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

module.exports = router;