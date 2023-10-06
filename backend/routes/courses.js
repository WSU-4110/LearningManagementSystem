const router = require('express').Router();
let Course = require('../models/course.model')
router.route('/').get(async (req, res) => {
    try {
        let courses = await Course.find();
        res.json(courses);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const newCourse = Course({ name: name });
    newCourse.save()
        .then(() => res.json('course added!'))
        .catch(err => res.status(400).json('error: ' + err));
});
module.exports = router;