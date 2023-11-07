let Student = require('./models/student.model');
let RefreshToken = require('./models/refreshToken.model');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const atlasURI = process.env.ATLAS_URI;
mongoose.connect(atlasURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('atlas connected');
});
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}
app.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newStudentObj = { 
            email: req.body.email, 
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        Student(newStudentObj).save();
        res.status(201).send();
      } catch(err) {
        res.status(500).send('error: ' + err);
      }
});
let refreshTokens = []
app.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401);
    if (!await RefreshToken.findOne({ token: req.body.token })) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ email: user.email, _id: user._id });
        res.status(201).json({ accessToken: accessToken });
    });
})
app.post('/logout', async (req, res) => {
    await RefreshToken.deleteOne({ token: req.body.token });
    res.sendStatus(204);
});
app.post('/login', async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (student == null) {
            res.status(400).json(`student with email: ${req.body.email} not found`);
        }
        if (await bcrypt.compare(req.body.password, student.password)) {
            const payload = { email: req.body.email, _id: student._id };
            const accessToken = generateAccessToken(payload);
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
            const refreshTokenObj = { token: refreshToken };
            await RefreshToken(refreshTokenObj).save();
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.send(false);
        }
    } catch(err) {
        console.log("authServer is messed up");
        res.status(500).json('error: ' + err);
    }
});
app.listen(4000)