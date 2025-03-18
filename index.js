const express = require("express");
const cookieParser = require("cookie-parser")
const checkToken = require("./Midelware/auth")

const authRoute = require("./Routes/AuthRoute"); 
const adminRoute = require("./Routes/adminRoute"); 
const ratingRoute = require("./Routes/ratingRoute");
const patientRoute = require("./Routes/patientsRoutes");
const profileRoute = require("./Routes/profile");
const appointmentRouter = require("./Routes/appointmentRoutes");

const { conectionDatabase } = require("./connection");
const forPatient = require("./Midelware/forPatient");

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(checkToken("token"))


app.get("/", (req, res) => {
  res.send("Hello from server");
});


app.use("/api/v1/admin", adminRoute); 
app.use("/api/v1/Authentication", authRoute); 
app.use("/api/v1/rating", ratingRoute); 
app.use("/api/v1/self", profileRoute); 
app.use("/api/v1/appointment", appointmentRouter); 
app.use("/api/v1/patient", patientRoute); 
// app.use("/api/doctorAuth", doctorSigninRoutes); 

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}...`);
});

conectionDatabase(); 
