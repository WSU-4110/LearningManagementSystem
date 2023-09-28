const router = require('express').Router();
let Student = require('../models/student.model')
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
    const newStudent = Student({ email, password });
    newStudent.save()
        .then(() => res.json('student added!'))
        .catch(err => res.status(400).json('error: ' + err));
});
module.exports = router;