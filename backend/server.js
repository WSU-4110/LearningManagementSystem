const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const atlasURI = process.env.ATLAS_URI;
mongoose.connect(atlasURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('atlas connected')
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});