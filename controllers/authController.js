const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const Password = req.body.password;
    
    const passwordHash = await bcrypt.hash(Password, 12);

    const user = new User({
        fullname: fullname,
        username: username,
        password: passwordHash,
        token: "some-token"
    });

    const userData = await user.save();
    res.status(201).json({
        message: "Sign up successfull.",
        user: userData
    });
};

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    if (!user) {
        res.status(500).json({
            message: "User not found."
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(500).json({
            message: "Invalid credentials."
        });
    } 

    const token = await jwt.sign({
        username: username,
        userId: user._id.toString()
    }, 'secret', { expiresIn: '1h' });

    res.status(200).json({
        userId: user._id.toString(),
        token: token
    });
};