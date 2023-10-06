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
router.route('/signin').post((req, res) => {
    Student.findOne({ email: req.body.email })
        .then(student => {
            if (student === null) {
                res.status(400).json(`student with email: ${req.body.email} not found`);
                return; // this seems weird
            }
            scrypt(req.body.password, Buffer.from(student.salt, 'base64'), 256, (err, derivedKey) => {
                if (err) throw err;
                const hash = derivedKey.toString('base64');
                if (student.password === hash) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            });
        })
        //.catch(err => { res.status(400).json('error: ' + err); });
});
module.exports = router;