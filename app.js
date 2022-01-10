const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

const swaggerUI = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');



// const is_auth = require('./middlewares/is_authenticated');



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));



var teacherRoutes = require('./routes/teacher');
var authRoutes = require('./routes/authentication');
app.use(teacherRoutes);
app.use(authRoutes);

mongoose.connect('mongodb+srv://user:1234@cluster0.7twjo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(result => {
        app.listen(8000, () => {
            console.log('Server live on port 8000..!');
        });
    })
    .then(error => {
        console.log(error);
    })

