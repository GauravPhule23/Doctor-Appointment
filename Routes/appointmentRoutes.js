const express = require("express");
const appointmentBooking = require("../Controllers/appointmentControllers.js");


const router = express.Router();

router.post("/:doctorId",appointmentBooking);// 

module.exports = router;
