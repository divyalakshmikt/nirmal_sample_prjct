const staffModel = require('../models/staffModel');

exports.staffDetails = (req, res, next) => {
    const staffs = staffModel.find()
    .then(result => {
        res.status(200).json({
            staffs: result,
            userId: req.userId
        });
    })
    .then(error => {
        console.log(error);
    })
};

exports.newStaff = (req, res, next) => {
    const name = req.body.name;
    const designation = req.body.designation;
    const subject = req.body.subject;

    const staff = new staffModel({
        name: name,
        designation: designation,
        subject: subject
    });
    
    staff.save()
    .then(result => {
        res.status(200).json({
            message: 'success',
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.staffUpdate = (req, res, next) => {
    const staffId = req.params.staffId;

    const name = req.body.name;
    const designation = req.body.designation;
    const subject = req.body.subject;

    const staff = staffModel.findById(staffId)
    .then(result => {
        if(!result) {
            res.status(501).json({
                message: 'No staff with this Id'
            });
        }
        result.name = name;
        result.designation = designation;
        result.subject = subject;

        return result.save();
    })
    .then(staff => {
        res.status(200).json({
            message: 'Staff details updated.',
            staff: staff
        });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.removeStaff = (req, res, next) => {
    const staffId = req.params.staffId;
    const staff = staffModel.findById(staffId)
    .then(result => {
        if(!result) {
            res.status(501).json({
                message: 'No staff with this Id'
            });
        }
        return staffModel.findByIdAndDelete(staffId);
    })
    .then(staff => {
        res.status(200).json({
            message: 'Staff details removed.',
            staff: staff
        });
    })
    .catch(error => {
        console.log(error);
    });
};