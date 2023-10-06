const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());
const atlasURI = process.env.ATLAS_URI;
mongoose.connect(atlasURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('atlas connected');
});
const studentsRouter = require('./routes/students');
const coursesRouter = require('./routes/courses');
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter)
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});