const router = require('express').Router();
const Assignment = require('../models/assignment.model');

// route for each CRUD operation
// [C] create an assignment
router.route('/').post(async (req, res) => {
    try {
        const assignment = await Assignment(req.body.assignment).save();
        res.status(200).json({message: 'assignment created', _id: assignment._id});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [R] get assignment by id
router.route('/:_id').get(async (req, res) => {
    try {
        let assignment = await Assignment.findById(req.params._id);
        res.status(200).json({message: 'assignment read', assignment});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [U] update an assignment by id (body should have desired copy of the assignment)
router.route('/').patch(async (req, res) => {
    try {
        let assignment = await Assignment.findById(req.body.assignment._id);
        assignment.name = req.body.assignment.name;
        assignment.dueDate = req.body.assignment.dueDate;
        assignment.content = req.body.assignment.content;
        await assignment.save();
        res.status(200).json({message: 'assignment updated'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [D] delete an assignment by id
router.route('/').delete(async (req, res) => {
    try {
        await Assignment.deleteOne({_id: req.body._id});
        res.status(200).json({message: 'assignment deleted'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

module.exports = router;