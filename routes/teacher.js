const express = require('express');
const router = express.Router();
const is_auth = require('../middlewares/is_authenticated');

const teachercontroller = require('../controllers/teacherController');

router.get('/teachers', is_auth, teachercontroller.teacherDetails);
router.post('/teachers/newTeacher', is_auth, teachercontroller.newTeacher);
router.put('/teachers/:teacherId', is_auth, teachercontroller.teacherUpdate);
router.delete('/removeTeacher/:teacherId', is_auth, teachercontroller.removeTeacher);

module.exports = router;