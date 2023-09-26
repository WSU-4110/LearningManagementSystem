const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5050;
app.use(express.json());
const atlasURI = process.env.ATLAS_URI;
mongoose.connect(atlasURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('atlas connected');
});
const studentRouter = require('./routes/students');
app.use('/students', studentRouter);
app.route('/').get((req, res) => {
    res.json('welcome!')
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});