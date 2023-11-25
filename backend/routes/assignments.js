const router = require('express').Router();
const Assignment = require('../models/assignment.model');
router.route('/:id').get(async (req, res) => {
    try {
        let assignment = await Assignment.findById(req.params.id);
        res.json(assignment);
    } catch(err) {
        res.status(400).json('error: ' + err);
    }
});
router.route('/add').post(async (req, res) => {
    try {
        await Assignment({
            name: req.body.name,
            dueDate: req.body.dueDate,
            content: req.body.content
        }).save();
        res.json('assignment added!');
    } catch(err) {
        res.status(400).json('error: ' + err)
    }
});
module.exports = router;