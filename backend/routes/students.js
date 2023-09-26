const router = require('express').Router();
let Student = require('../models/student.model')
router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('error: ' + err));
});
router.route('/add').post((req, res) => {
    const name = req.body.name; // fyi: app must use(express.json()) to read like this 
    const newStudent = Student({ name });
    newStudent.save()
        .then(() => res.json('student added!'))
        .catch(err => res.status(400).json('error: ' + err));
});
module.exports = router;