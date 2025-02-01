const express = require("express");
// const mongoose = require("mongoose");
const patientRoutes = require("./Routes/patientSignin"); // ✅ Import correctly
const { conectionDatabase } = require("./connection");

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

// ✅ Test API Route
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// ✅ Use the patient routes correctly
app.use("/api/patient", patientRoutes); 

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}...`);
});

conectionDatabase(); // ✅ Ensure database connection is called
