const express = require("express");
const { patientSignIN } = require("../Controllers/Auth");

const router = express.Router();

// ✅ Define the correct route path
router.post("/signin", patientSignIN);

module.exports = router;
