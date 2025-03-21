const express = require("express");
const {Login, Logout, SignUp} = require("../Controllers/Auth");
const upload = require("../Midelware/multerUpload");

const router = express.Router();


router.post("/sign-up",upload.single("DP"),SignUp);
router.post("/login",Login);
router.get("/logout",Logout);

module.exports = router;
