const express = require("express");
const cookieParser = require("cookie-parser")
const checkToken = require("./Midelware/auth")

// const patientSigninRoutes = require("./Routes/patientAuth"); 
const authRoute = require("./Routes/AuthRoute"); 

const { conectionDatabase } = require("./connection");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());  
app.use(checkToken())


app.get("/", (req, res) => {
  res.send("Hello from server");
});


app.use("/api/Authentication", authRoute); 
// app.use("/api/doctorAuth", doctorSigninRoutes); 

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}...`);
});

conectionDatabase(); // ✅ Ensure database connection is called
