const express = require('express');
const router = express.Router();
const is_auth = require('../middlewares/is_authenticated');

const staffcontroller = require('../controllers/staffController');

router.get('/staffs',  staffcontroller.staffDetails);
router.post('/staffs/newStaff', staffcontroller.newStaff);
router.put('/staffs/:staffId', staffcontroller.staffUpdate);
router.delete('/removeStaff/:staffId', staffcontroller.removeStaff);

module.exports = router;