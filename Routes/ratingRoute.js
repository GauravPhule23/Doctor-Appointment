const express = require("express");
const ratingUpdate = require("../Controllers/ratingController");


const router = express.Router();


router.post("/add-new/:id",ratingUpdate);


module.exports = router;
