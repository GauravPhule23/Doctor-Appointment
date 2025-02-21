const express = require("express");
const ratingUpdate = require("../Controllers/ratingController");
// const {Login, Logout, SignUp} = require("../Controllers/Auth");

const router = express.Router();


router.post("/add-new/:id",ratingUpdate);
// router.post("/login",Login);
// router.get("/logout",Logout);

module.exports = router;
