const mongoose = require("mongoose");

async function conectionDatabase(){
 await mongoose.connect("mongodb://localhost:27017/doctorAppointmentV1").then(()=>{
  console.log("MongoDB connected..")
}).catch((e)=>{
  console.log("Error in connecting Mongodb ",e);
})
}

module.exports={
conectionDatabase,

}