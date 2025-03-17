const mongoose = require("mongoose")

const cancledSchema = new mongoose.Schema({
  appointment:{type:mongoose.Schema.Types.ObjectId, ref:"Appointment",required:true, unique:true},
  reason:{type:String, required:true},
  cancledBY:{type:String, enum:["Doctor", "Patient", "Admin"] , required:true},

})

const Cancled = mongoose.model("Cancled",cancledSchema)

module.exports = Cancled;