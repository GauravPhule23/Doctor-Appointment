// require('dotenv').config();
require('dotenv').config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const checkToken = require("./Midelware/auth");

const authRoute = require("./Routes/AuthRoute"); 
const adminRoute = require("./Routes/adminRoute"); 
const ratingRoute = require("./Routes/ratingRoute");
const patientRoute = require("./Routes/patientsRoutes");
const doctorRoute = require("./Routes/doctorRoutes");
const profileRoute = require("./Routes/profile");
const appointmentRouter = require("./Routes/appointmentRoutes");

const { conectionDatabase } = require("./connection");

const app = express();
conectionDatabase();

// ✅ Debugging middleware to log incoming requests
app.use((req, res, next) => {
  console.log("🔍 Incoming request:");
  console.log("➡️ Origin:", req.headers.origin);
  console.log("➡️ Method:", req.method);
  console.log("➡️ Headers:", req.headers);
  next();
});

// ✅ Proper CORS Configuration
app.use(cors({
  origin: 'https://quickcare-henna.vercel.app/', // ✅ Allow all origins TEMPORARILY for debugging
  credentials: true,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));
app.use((req, res, next) => {
  console.log("aftr cors");
  next();
});
// ✅ Essential Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkToken("token"));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("✅ CORS is working!");
});

// ✅ Routes
app.use("/api/v1/admin", adminRoute);
app.use((req, res, next) => {
  console.log("bfr authroute");
  next();
});
app.use("/api/v1/Authentication", authRoute);
app.use((req,res,next)=>{
  console.log("aftr authroute");
  next()
})

app.use("/api/v1/rating", ratingRoute);
app.use("/api/v1/self", profileRoute);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/doctor", doctorRoute);

// ✅ Start Server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}...`);
});

