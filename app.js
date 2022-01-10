const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

const swaggerUI = require('swagger-ui-express'),
 swaggerDocument = require('./swagger.json');


const staffRoutes = require('./routes/staff');
const authRoutes = require('./routes/authentication');
const is_auth = require('./middlewares/is_authenticated');

app.use( is_auth, staffRoutes);
app.use( authRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mongoose.connect('mongodb+srv://expressNode:qwerty098@cluster0.79awc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(result => {
    app.listen(8000, () => {
        console.log('Server live on port 8000..!');
    });
})
.then(error => {
    console.log(error);
})

