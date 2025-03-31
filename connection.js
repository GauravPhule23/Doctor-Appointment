const mongoose = require("mongoose");

async function conectionDatabase(){
 await mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("MongoDB connected..")
}).catch((e)=>{
  console.log("Error in connecting Mongodb ",e);
})
}

module.exports={
conectionDatabase,

}