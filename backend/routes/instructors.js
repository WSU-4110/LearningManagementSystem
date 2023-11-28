const router = require('express').Router();
let Instructor = require('../models/instructor.model');

/* 
    this is an additional route, for an instructor to get their id.
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
// [C] create an instructor
router.route('/').post(async (req, res) => {
    try {
        const instructor = await Instructor({
            email: req.body.instructor.email,
            password: req.body.instructor.password,
            firstName: req.body.instructor.firstName,
            lastName: req.body.instructor.lastName,
            courses: req.body.instructor.courses
        }).save();
        res.status(200).json({message: 'instructor created', id: instructor._id});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [R] get instructor by id
router.route('/:id').get(async (req, res) => {
    try {
        let instructor = await Instructor.findById(req.params.id);
        res.status(200).json({message: 'instructor read', instructor});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [U] update an instructor by id (body should have desired copy of the instructor)
router.route('/').patch(async (req, res) => {
    try {
        let instructor = await Instructor.findById(req.body.id);
        instructor.email = req.body.instructor.name;
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
        await Instructor.deleteOne({_id: req.body.id});
        res.status(200).json({message: 'instructor deleted'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

module.exports = router;