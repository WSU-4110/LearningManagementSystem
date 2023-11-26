/*
    This is our main server. It deals with serving data from the database to the frontend.
*/



// import packages
// mongoose is ODM (Object Data Modeling) library for MongoDB
const mongoose = require('mongoose');
// jsonwebtoken library is for generating tokens for authentication & authorization
const jwt = require('jsonwebtoken');
// express is backend web application framework for making APIs (it *is* the server)
const express = require('express');
// cors is a package which provides middleware (thing between request & response) that enables CORS (cross origin resource sharing)
const cors = require('cors');
// dotenv is a package that enables us to read the .env file and use the values from there
require('dotenv').config();



// creating a function (that will be used as a middleware) to authenticate tokens
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



// initialize our app
const app = express();
// define port variable
const port = 5050;



// telling our express app to use the following middleware:
app.use(cors());
// express.json() allows us to easily read json
app.use(express.json());
// skip token verification in testing
if (process.env.USE_TOKEN_AUTH === 'true') {
    app.use(authenticateToken);
}




// connecting to database
// get ATLAS_URI from .env file and put value into atlasURI variable
const atlasURI = process.env.ATLAS_URI;
// actually connecting to database
mongoose.connect(atlasURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('data server: atlas connected');
});



// import our routers and give them to our express app
const assignmentRouter = require('./routes/assignments');
const studentsRouter = require('./routes/students');
const coursesRouter = require('./routes/courses');
app.use('/assignments', assignmentRouter);
app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);


// actually starting the server
if (process.env.RUN_DATA_SERVER === 'true') {
    app.listen(port, () => {
        console.log(`data server: running on port ${port}`);
    });
}




// export app for testing
let test_port;
let server_instance

module.exports = (port) => {
    test_port = port;
    server_instance = app.listen(test_port, () => {
        console.log(`data server is running on port ${test_port}`);
    });
    return server_instance;
};

module.exports.stopServer = () => {
    if (server_instance) {
        server_instance.close(() => {
            console.log(`data server on port ${test_port} is stopped`);
        });
    }
};