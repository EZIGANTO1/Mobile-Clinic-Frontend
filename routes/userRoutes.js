const express = require('express');
const { isAdminAuthenticated, isPatientAuthenticated } = require('../auth/auth')
const { patientRegister, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor, login } = require('../controller/userController');

const router = express.Router();

router.post('/patient/register', patientRegister)
router.post('/user/login', login)
router.post('/admin/addnew', isAdminAuthenticated, addNewAdmin)
router.get('/doctors', getAllDoctors)
router.get('/admin/me', isAdminAuthenticated, getUserDetails)
router.get('/patient/me', isPatientAuthenticated, getUserDetails)
router.get('/admin/logout', isAdminAuthenticated, logoutAdmin)
router.get('/patient/logout', isPatientAuthenticated, logoutPatient)
router.post('/doctor/addnew', isAdminAuthenticated, addNewDoctor)


module.exports = router;