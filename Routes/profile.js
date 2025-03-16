const express = require("express");
const profileView = require("../Controllers/profilecontroller");


const router = express.Router();

router.get("/",profileView);// route gives a response of the user data 

module.exports = router;
