const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
const app = express();
const port = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());
app.use(authenticateToken);
const atlasURI = process.env.ATLAS_URI;
mongoose.connect(atlasURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('atlas connected');
});
const assignmentRouter = require('./routes/assignments');
const studentsRouter = require('./routes/students');
const coursesRouter = require('./routes/courses');
app.use('/assignments', assignmentRouter);
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});