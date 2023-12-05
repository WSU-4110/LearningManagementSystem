const router = require('express').Router();
let Instructor = require('../models/instructor.model');

/* 
    this is an additional route, for an instructor to get their id.
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
// [C] create an instructor
router.route('/').post(async (req, res) => { // !!!!!!! dont need a redundant object!
    try {
        const instructor = await Instructor(req.body.instructor).save();
        res.status(200).json({message: 'instructor created', _id: instructor._id});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [R] get instructor by id
router.route('/:_id').get(async (req, res) => {
    try {
        let instructor = await Instructor.findById(req.params._id);
        res.status(200).json({message: 'instructor read', instructor});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [U] update an instructor by id (body should have desired copy of the instructor)
router.route('/').patch(async (req, res) => {
    try {
        let instructor = await Instructor.findById(req.body.instructor._id);
        instructor.email = req.body.instructor.email;
        instructor.password = req.body.instructor.password;
        instructor.firstName = req.body.instructor.firstName;
        instructor.lastName = req.body.instructor.lastName;
        instructor.courses = req.body.instructor.courses;
        await instructor.save();
        res.status(200).json({message: 'instructor updated'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [D] delete an instructor by id
router.route('/').delete(async (req, res) => {
    try {
        await Instructor.deleteOne({_id: req.body._id});
        res.status(200).json({message: 'instructor deleted'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

router.route('/bycourse/:courseId').get(async (req, res) => {
    try {
        const instructor = await Instructor.findOne({ courses: req.params.courseId });
        if (!instructor) {
            return res.status(404).json({message: 'Instructor not found for this course'});
        }
        res.status(200).json({email: instructor.email});
    } catch (err) {
        res.status(500).json({message: 'error: ' + err});
    }
});


module.exports = router;