const mongoose = require("mongoose")
const Completed = require("./completedSchema")
const Pending = require("./pendingSchema")
const Approved = require("./approvedSchema")


async function forApproved(appointment1){
  const rm = await Pending.findOneAndDelete({appointment:appointment1._id})

  const approved = await Approved.create({
    appointment:appointment1._id
  })
  console.log("removed from pending ", rm, "and approved appointment", approved)
}
async function forCompleted(appointment1){
  const rm = await Approved.findOneAndDelete({appointment:appointment1._id})

  const complete = await Completed.create({
    appointment:appointment1._id
  })
  console.log("removed from approved ", rm, "and completed appointment", complete)
}


const appointmentSchema = new mongoose.Schema({
  patient: {type:mongoose.Schema.Types.ObjectId, ref:"Patient", required:true},
  doctor: {type:mongoose.Schema.Types.ObjectId, ref:"Doctor", required:true},
  date: {type:Date, required:true},
  startTime: {type:String, required:true},
  endTime: {type:String, required:true},
  status: {type:String, enum:["Pending","Approved","Completed","Cancled"], default:"Pending"},

},{timestamps:true})
appointmentSchema.pre("save", async function (next){
  const appointment = this
  if(appointment.isModified("status") && appointment.status != "Cancled"){
    switch (appointment.status) {
      case "Approved":
        forApproved(appointment)
        break;
      case "Completed":
        forCompleted(appointment)
        break;
      default:
        console.log("no change")
        break;
    }
  }
  next()
})

const Appointment = mongoose.model("Appointment",appointmentSchema)

module.exports = Appointment;