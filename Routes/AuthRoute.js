const express = require("express");
const {Login, Logout, SignUp} = require("../Controllers/Auth");
const upload = require("../Midelware/multerUpload");

const router = express.Router();
console.log("entered authRoute");

router.post("/signup",upload.single("DP"),SignUp);
// router.post("/signup", (req, res) => {
//   console.log("📌 Reached signup route with data:", req.body);
//   res.send("Signup successful!");
// });

router.post("/login",Login);
router.get("/logout",Logout);

module.exports = router;
