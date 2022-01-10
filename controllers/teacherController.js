const teacherModel = require('../models/teacherModel');

exports.teacherDetails = (req, res, next) => {
    const teachers = teacherModel.find()
    .then(result => {
        res.status(200).json({
            teachers: result,
            userId: req.userId
        });
    })
    .then(error => {
        console.log(error);
    })
};

exports.newTeacher = (req, res, next) => {
    const name = req.body.name;
    const designation = req.body.designation;
    const subject = req.body.subject;

    const teacher = new teacherModel({
        name: name,
        designation: designation,
        subject: subject
    });
    
    teacher.save()
    .then(result => {
        res.status(200).json({
            message: 'success',
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.teacherUpdate = (req, res, next) => {
    const teacherId = req.params.teacherId;

    const name = req.body.name;
    const designation = req.body.designation;
    const subject = req.body.subject;

    const teacher = teacherModel.findById(teacherId)
    .then(result => {
        if(!result) {
            res.status(501).json({
                message: 'No teacher with this Id'
            });
        }
        result.name = name;
        result.designation = designation;
        result.subject = subject;

        return result.save();
    })
    .then(teacher => {
        res.status(200).json({
            message: 'Teacher details updated.',
            teacher: teacher
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.removeTeacher = (req, res, next) => {
    const teacherId = req.params.teacherId;
    const teacher = teacherModel.findById(teacherId)
    .then(result => {
        if(!result) {
            res.status(501).json({
                message: 'No teacher with this Id'
            });
        }
        return teacherModel.findByIdAndDelete(teacherId);
    })
    .then(teacher => {
        res.status(200).json({
            message: 'Teacher details removed.',
            teacher: teacher
        });
    })
    .catch(error => {
        console.log(error);
    });
};