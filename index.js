const express = require("express");
const cookieParser = require("cookie-parser")
const checkToken = require("./Midelware/auth")

const authRoute = require("./Routes/AuthRoute"); 
const adminRoute = require("./Routes/adminRoute"); 
const ratingRoute = require("./Routes/ratingRoute");
const profileRoute = require("./Routes/profile");

const { conectionDatabase } = require("./connection");

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(checkToken("token"))


app.get("/", (req, res) => {
  res.send("Hello from server");
});


app.use("/api/admin", adminRoute); 
app.use("/api/Authentication", authRoute); 
app.use("/api/rating", ratingRoute); 
app.use("/api/self", profileRoute); 
// app.use("/api/doctorAuth", doctorSigninRoutes); 

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}...`);
});

conectionDatabase(); 
