const express = require("express");
const {Login, Logout, SignUp} = require("../Controllers/adminControllers");

const router = express.Router();


router.post("/sign-up",SignUp);
router.post("/login",Login);
router.get("/logout",Logout);

module.exports = router;
