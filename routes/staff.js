const express = require('express');
const router = express.Router();

const staffcontroller = require('../controllers/staffController');

router.get('/staffs', staffcontroller.staffDetails);
router.post('/staffs/newStaff', staffcontroller.newStaff);
router.put('/staffs/:staffId', staffcontroller.staffUpdate);
router.delete('/removeStaff/:staffId', staffcontroller.removeStaff);

module.exports = router;