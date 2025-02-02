const express = require("express");
const { doctorSignIN } = require("../Controllers/Auth");

const router = express.Router();

// ✅ Define the correct route path
router.post("/signin", doctorSignIN);

module.exports = router;
