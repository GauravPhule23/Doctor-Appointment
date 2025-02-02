const express = require("express");

const patientSigninRoutes = require("./Routes/patientAuth"); 
const doctorSigninRoutes = require("./Routes/doctorAuth"); 

const { conectionDatabase } = require("./connection");

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

// ✅ Test API Route
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// ✅ Use the patient routes correctly
app.use("/api/patientAuth", patientSigninRoutes); 
app.use("/api/doctorAuth", doctorSigninRoutes); 

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}...`);
});

conectionDatabase(); // ✅ Ensure database connection is called
