/*
    This is a server that deals exclusively with authentication & authorization. 
    It's job is to give users tokens that allow the users to use certain parts of the main server (server.js).
*/



// import packages (most already described in server.js)
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
// bcrypt is a library we use for hashing passwords
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();



// import mongoose models (these are needed to interact with the database)
let Student = require('./models/student.model');
let RefreshToken = require('./models/refreshToken.model');
let Instructor = require('./models/instructor.model');



// create express app called "app"
const app = express();
// define port variable
const port = 4000;


//  giving our express app middleware to use
app.use(cors());
app.use(express.json());



// connecting to database
const atlasURI = process.env.ATLAS_URI;
mongoose.connect(atlasURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('auth server: atlas connected');
});



// creating a function to generate tokens that encode a "payload" inside of them, and expire in 15 seconds
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}



// defining routes
// this route is for creating a new student
app.post('/student', async (req, res) => { // CLEAN THIS UP
    try {
        // hash the password (the password is in the body of the request)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // create an object to represent new student
        const newStudentObj = { 
            email: req.body.email, 
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        // save the student object to the database
        await Student(newStudentObj).save();
        // send 201 status back
        res.status(201).send();
    } catch(err) {
        // incase of an error, send back status 500
        res.status(500).send('error: ' + err);
    }
});
// route for creating a new instructor
app.post('/instructor', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.instructor.password, 10);
        req.body.instructor.password = hashedPassword;
        const instructor = await Instructor(req.body.instructor).save();
        res.status(200).json({message: 'instructor created', id: instructor._id});
    } catch(err) {
        res.status(400).json({message: 'error: ' + err});
    }
});
// this route is used by users that already have a valid refresh token, to get a new access token
app.post('/token', async (req, res) => {
    // get the refresh token from the request
    const refreshToken = req.body.token;
    // if no refresh token was provided send 401
    if (refreshToken == null) return res.sendStatus(401);
    // if refresh token is not valid (aka if its not in the refreshToken table) send status 403
    if (!await RefreshToken.findOne({ token: refreshToken })) return res.sendStatus(403);
    // use jsonwebstoken package to verify that the refresh token is valid
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        // make new access token
        const accessToken = generateAccessToken({ email: user.email, _id: user._id });
        // return new access token as json
        res.status(201).json({ accessToken: accessToken });
    });
});
// this route is used to invalidate (just remove from database) a refresh token.
app.post('/logout', async (req, res) => {
    await RefreshToken.deleteOne({ token: req.body.token });
    res.sendStatus(204);
});
//  this route is for student login
app.post('/studentLogin', async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (student == null) {
            res.status(400).json(`student with email: ${req.body.email} not found`);
            return;
        }
        // compare hashes
        if (await bcrypt.compare(req.body.password, student.password)) {
            // create "payload" object that holds the email and _id of the user (student)
            const payload = { email: req.body.email, _id: student._id };
            // create access token and embed the payload in it
            const accessToken = generateAccessToken(payload);
            // create refresh token with payload embedded in it
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
            // createa a resfresh token object
            const refreshTokenObj = { token: refreshToken };
            // put refresh token object in the database (so we remember that it is valid)
            await RefreshToken(refreshTokenObj).save();
            // give the access token and the refresh token back
            res.json({ id: student._id, accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.send(false);
        }
    } catch(err) {
        console.log("authServer is messed up");
        res.status(500).json('error: ' + err);
    }
});
// this route is for instructor login
app.post('/instructorLogin', async (req, res) => {
    try {
        const instructor = await Instructor.findOne({ email: req.body.email });
        if (instructor == null) {
            res.status(400).json(`instructor with email: ${req.body.email} not found`); // return something to make frontend error handlign easy
            return;
        }
        // compare hashes
        if (await bcrypt.compare(req.body.password, instructor.password)) {
            // create "payload" object that holds the email and _id of the user (instructor)
            const payload = { email: req.body.email, _id: instructor._id };
            // create access token and embed the payload in it
            const accessToken = generateAccessToken(payload);
            // create refresh token with payload embedded in it
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
            // createa a resfresh token object
            const refreshTokenObj = { token: refreshToken };
            // put refresh token object in the database (so we remember that it is valid)
            await RefreshToken(refreshTokenObj).save();
            // give the access token and the refresh token back
            res.json({ id: instructor._id, accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.send(false);
        }
    } catch(err) {
        console.log("authServer is messed up");
        res.status(500).json('error: ' + err);
    }
});



// actually starting the auth server
app.listen(port, () => {
    console.log(`auth server: running on port ${port}`);
});