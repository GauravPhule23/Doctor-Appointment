const express = require("express");
const updatePatient = require("../Controllers/patientControllers")
// const {Login, Logout, SignUp} = require("../Controllers/Auth");

const router = express.Router();


router.patch("/update",updatePatient);
// router.post("/login",Login);
// router.get("/logout",Logout);

module.exports = router;
