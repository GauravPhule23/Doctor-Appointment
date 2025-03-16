const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
  patient: {type:mongoose.Schema.Types.ObjectId, ref:"Patient", required:true},
  doctor: {type:mongoose.Schema.Types.ObjectId, ref:"Doctor", required:true},
  Date: {type:Date, required:true},
  startTime: {type:String, required:true},
  endTime: {type:String, required:true},
  status: {type:String, enum:["Pending","Approved","Completed","Cancled"], default:"Pending", required:true},

})

const Appointment = mongoose.model("Appointment",appointmentSchema)

module.exports = Appointment;