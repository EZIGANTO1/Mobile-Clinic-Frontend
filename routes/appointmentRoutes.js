const express = require('express');
const { isPatientAuthenticated, isAdminAuthenticated } = require('../auth/auth')
const { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment } = require('../controller/appointmentController')


const router = express.Router();

router.post('/post', isPatientAuthenticated, postAppointment)
router.get('/getall', isAdminAuthenticated, getAllAppointments)
router.put('/update/:id', isAdminAuthenticated, updateAppointmentStatus)
router.delete('/delete/:id', isAdminAuthenticated, deleteAppointment)

module.exports = router