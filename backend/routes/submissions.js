const router = require('express').Router();
let Submission = require('../models/submission.model');
const express = require('express');
const multer = require('multer');
const path = require('path');

// route for each CRUD operation
// [C] create a submission
let generatedFileName;
// set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        generatedFileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, generatedFileName);
    },
});
const upload = multer({storage});

router.route('/').post(upload.single('file'), async (req, res) => {    
    try {
        submission_collection_entry = {
            student_id: req.body.student_id,
            grade: req.body.grade, // should be -1 by default
            comment: "", // empty comment by default
            filePath: 'uploads/' + generatedFileName
        };
        const submission = await Submission(submission_collection_entry).save();
        res.status(200).json({message: 'submission created', _id: submission._id});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [R] get a submission by id
router.route('/:_id').get(async (req, res) => {
    try {
        let submission = await Submission.findById(req.params._id);
        res.status(200).json({message: 'submission read', submission});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [U] update a submission by id (body should have desired copy of the submission)
router.route('/').patch(async (req, res) => {
    try {
        let submission = await Submission.findById(req.body.submission._id);
        submission.student_id = req.body.submission.student_id;
        submission.grade = req.body.submission.grade;
        submission.comment = req.body.submission.comment;
        submission.filePath = req.body.submission.filePath;
        await submission.save();
        res.status(200).json({message: 'submission updated'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

// [D] delete a submission by id
router.route('/').delete(async (req, res) => {
    try {
        await Submission.deleteOne({_id: req.body._id});
        res.status(200).json({message: 'submission deleted'});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});

module.exports = router;