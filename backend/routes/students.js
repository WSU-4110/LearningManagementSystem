const router = require('express').Router();
const { scrypt, randomBytes } = require('crypto');
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
    scrypt(password, randomBytes(128), 256, (err, derivedKey) => {
        console.log(`${derivedKey}`);
        const hash = derivedKey.toString('base64');
        console.log(`hash: ${hash}`);
        const newStudent = Student({ email: email, password: hash });
        console.log(`${newStudent}`);
        newStudent.save()
            .then(() => res.json('student added!'))
            .catch(err => res.status(400).json('error: ' + err));
    });
});
module.exports = router;