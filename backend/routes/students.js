const router = require('express').Router();
const { scrypt, randomBytes } = require('crypto');
let Student = require('../models/student.model');
router.route('/').get(async (req, res) => {
    try {
        let students = await Student.find();
        res.json(students);
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
router.route('/add').post((req, res) => {
    const salt = randomBytes(128);
    scrypt(req.body.password, salt, 256, (err, derivedKey) => {
        if (err) throw err;
        const hash = derivedKey.toString('base64');
        const stringSalt = salt.toString('base64');
        const newStudent = Student({ 
            email: req.body.email, 
            password: hash, 
            salt: stringSalt,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        newStudent.save()
            .then(() => res.json('student added!'))
            .catch(err => res.status(400).json('error: ' + err));
    });
});
router.route('/signin').post(async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email })
        if (student === null) {
            res.status(400).json(`student with email: ${req.body.email} not found`);
            return; // this seems weird
        }
        scrypt(req.body.password, Buffer.from(student.salt, 'base64'), 256, (err, derivedKey) => {
            if (err) throw err;
            const hash = derivedKey.toString('base64');
            if (student.password === hash) {
                res.send(student._id);
            } else {
                res.send(null);
            }
        });
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
router.route('/getCourses/:id').get(async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student.courses);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
module.exports = router;