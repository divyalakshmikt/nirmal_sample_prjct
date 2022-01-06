const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

const staffRoutes = require('./routes/staff');
app.use(staffRoutes);

mongoose.connect('mongodb+srv://expressNode:qwerty098@cluster0.79awc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(result => {
    app.listen(8000, () => {
        console.log('Server started...');
    });
})
.then(error => {
    console.log(error);
})

