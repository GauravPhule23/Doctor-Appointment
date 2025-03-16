const mongoose = require("mongoose")

const cancledSchema = new mongoose.Schema({
  appointment:{type:mongoose.Schema.Types.ObjectId, ref:"Appointment",required:true},
  reason:{type:String, required:true}

})

const Cancled = mongoose.model("Cancled",cancledSchema)

module.exports = Cancled;