// const mongoose = require("mongoose")
const Pending = require("../Models/pendingSchema")
const Appointment = require("../Models/AppointmentSchema")
async function appointmentBooking(req,res){
  const {AppointmentDate, startTime, endTime} = req.body
  const patient = req.user._id
  const doctor2 = req.params.doctorId

  const [day,month,year]=AppointmentDate.split("-").map(Number)// splits the date string using -
  const dateObj = new Date(year,month -1 ,day+1)// makes new date with info of data of datastring
  

  // console.log(dateObj)
  const doctor = doctor2.slice(1,)// removes : from :id
  
 
  if(!AppointmentDate, !startTime, !endTime, !patient, !doctor){
    res.status(401).json({message:"Incomplete Data, data feilds missing"})
  }
  try{
    const newAppointment = await Appointment.create({
      patient,
      doctor,
      date:dateObj,
      startTime,
      endTime
    });
    
    const appointmentId = newAppointment._id
    Pending.create({
      appointment : appointmentId
    })
    res.status(201).json({ message: "Appointment registered please wait untill Approved", appointment: newAppointment });
  }catch(error){
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }


}

module.exports = appointmentBooking