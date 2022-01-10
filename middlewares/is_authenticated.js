const jwt = require('jsonwebtoken');
const userId = require('../controllers/authController');

module.exports = async (req, res, next) => {
    let decodedToken;
    const token = req.headers.bearer;
    try {
        decodedToken = await jwt.verify(token, 'secret');
    } catch (error) {
        res.status(500).json({
            message: 'Cannot verify token'
        });
    }

    if (!decodedToken) {
        res.status(500).json({
            message: 'Invalid token'
        });
    }

    req.userId = decodedToken.userId;

    next();
}