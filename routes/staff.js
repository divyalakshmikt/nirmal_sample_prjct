const express = require('express');
const router = express.Router();
const is_auth = require('../middlewares/is_authenticated');

const staffcontroller = require('../controllers/staffController');

router.get('/staffs', is_auth, staffcontroller.staffDetails);
router.post('/staffs/newStaff', is_auth, staffcontroller.newStaff);
router.put('/staffs/:staffId', is_auth, staffcontroller.staffUpdate);
router.delete('/removeStaff/:staffId', is_auth, staffcontroller.removeStaff);

module.exports = router;