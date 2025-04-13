const express = require("express");
const {updatePatient, getDoctors, getDoctor, PendingAppointment, approvedAppointment, cancledAppointment, completedAppointment} = require("../Controllers/patientControllers")
const forPatient = require("../Midelware/forPatient")
// const {Login, Logout, SignUp} = require("../Controllers/Auth");

const router = express.Router();


router.route("/update").patch(forPatient,updatePatient);

router.route("/approvedAppointment").get(forPatient,approvedAppointment)
router.route("/completedAppointment").get(forPatient,completedAppointment)
router.route("/cancledAppointment").get(forPatient,cancledAppointment)
router.route("/pendingAppointment").get(forPatient,PendingAppointment)

router.route("/get-doctors").get(getDoctors)
router.route("/get-doctor/:id").get(getDoctor);


module.exports = router;
