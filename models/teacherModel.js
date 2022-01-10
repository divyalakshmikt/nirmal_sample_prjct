const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const teacherSchema = Schema({
    teachername: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('teacher', teacherSchema);