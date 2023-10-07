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
router.route('/add').post((req, res) => {
    const email = req.body.email; // fyi: app must use(express.json()) to read like this
    const password = req.body.password;
    const salt = randomBytes(128);
    scrypt(password, salt, 256, (err, derivedKey) => {
        if (err) throw err;
        const hash = derivedKey.toString('base64');
        const stringSalt = salt.toString('base64');
        const newStudent = Student({ email: email, password: hash, salt: stringSalt });
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

router.route('/profilepage').post(protect,updateUserProfile)

module.exports = router;