const express = require("express");
const { updateDoctor, PendingAppointment, approvedAppointment, cancledAppointment, completedAppointment } = require("../Controllers/doctorsControllers")
const forDoctor = require("../Midelware/forDoctor")
// const {Login, Logout, SignUp} = require("../Controllers/Auth");

const router = express.Router();


router.route("/update").patch(forDoctor, updateDoctor);

router.route("/approvedAppointment").get(forDoctor, approvedAppointment)
router.route("/completedAppointment").get(forDoctor, completedAppointment)
router.route("/cancledAppointment").get(forDoctor, cancledAppointment)
router.route("/pendingAppointment").get(forDoctor, PendingAppointment)



module.exports = router;
