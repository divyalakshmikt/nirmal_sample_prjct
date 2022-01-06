const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const staffSchema = Schema({
    name: {
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

module.exports = mongoose.model('staff', staffSchema);