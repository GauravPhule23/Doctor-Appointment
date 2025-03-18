const express = require("express");
const {appointmentBooking, appointmentApprove, appointmentCancle, appointmentComplete} = require("../Controllers/appointmentControllers.js");
const forPatient = require("../Midelware/forPatient.js");
// const appointmentCancle = require("../Controllers/appointmentControllers.js");


const router = express.Router();

router.post("/:doctorId",forPatient,appointmentBooking);// Books the appointment using the data atartTime endTime and Date
router.patch("/cancle/:appointmentId",appointmentCancle);//
router.patch("/approve/:appointmentId",appointmentApprove);//
router.patch("/completed/:appointmentId",appointmentComplete);//

module.exports = router;
