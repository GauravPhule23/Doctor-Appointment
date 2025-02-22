const express = require("express");
const profileView = require("../Controllers/profilecontroller");
// const {Login, Logout, SignUp} = require("../Controllers/Auth");

const router = express.Router();


// router.post("/sign-up",SignUp);
// router.post("/login",Login);
router.get("/",profileView);

module.exports = router;
