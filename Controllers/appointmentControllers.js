// const mongoose = require("mongoose")
const Doctor = require("../Models/doctorSchema")
const Admin = require("../Models/adminSchema")
const Patient = require("../Models/patientSchema")
const Pending = require("../Models/pendingSchema")
const Cancled = require("../Models/cancledSchema")
const Appointment = require("../Models/AppointmentSchema")
async function appointmentBooking(req, res) {
  if(req.user.role == "Patient"){
    const { AppointmentDate, startTime, endTime } = req.body
  const patient = req.user._id
  const doctor = req.params.doctorId

  const [day, month, year] = AppointmentDate.split("-").map(Number)// splits the date string using -
  const dateObj = new Date(year, month - 1, day + 1)// makes new date with info of data of datastring


  // console.log(dateObj)
  // const doctor = doctor2.slice(1,)// removes : from :id
 


  if (!AppointmentDate, !startTime, !endTime, !patient, !doctor) {
    res.status(401).json({ message: "Incomplete Data, data feilds missing" })
  }
  try {
    const newAppointment = await Appointment.create({
      patient,
      doctor,
      date: dateObj,
      startTime,
      endTime
    });

    const appointmentId = newAppointment._id
    Pending.create({
      appointment: appointmentId
    })
    res.status(201).json({ message: "Appointment registered please wait untill Approved", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
  }else{
    res.status(401).json({message:"Doctor or Admin is not authorized to book an appointment."})
  }


}


async function appointmentCancle(req, res) {
  const Id = req.params.appointmentId
  const info = Appointment.findById(Id)
  
  let user
  let admin
  if(req.user.role == "Patient"){
    user = await Patient.findById(info.patient)
  }else if(req.user.role == "Doctor"){
    user = await Doctor.findById(info.doctor)
  }else if (req.user.role == "Admin"){
    admin = await Admin.findById(req.user._id)
  }
  // req.user.role == "Patient"?user = await Patient.findById(info.patient):user = await Doctor.findById(info.doctor);

  if(req.user.email == user.email || admin){
    const reason = req.body.reason

  // Pending.findOne({appointment:Id});
  await Pending.findOneAndDelete({appointment:Id});

  const cancle = await Appointment.findById(Id)
  cancle.status = "Cancled";
  await cancle.save()

  const appointmentCancle =await Cancled.create({
    appointment: Id,
    patient:cancle.patient,
    doctor:cancle.doctor,
    reason,
    cancledBY: req.user.role
  })

  res.status(200).json({ message: `Appointment Cancled By ${req.user.role}`, obj: appointmentCancle })
  }else{
    res.status(401).json({message:`${req.user.fullName} is not allowed to cancle this appointment`})
  }
  
}
// async function appointmentCancle(req, res) {
//   const Id = req.params.appointmentId
//   const reason = req.body.reason

//   // Pending.findOne({appointment:Id});
//   await Pending.findOneAndDelete({appointment:Id});

//   const cancle = await Appointment.findById(Id)
//   cancle.status = "Cancled";
//   await cancle.save()

//   const appointmentCancle =await Cancled.create({
//     appointment: Id,
//     reason,
//     cancledBY: req.user.role
//   })

//   res.status(200).json({ message: `Appointment Cancled By ${req.user.role}`, obj: appointmentCancle })
// }


async function appointmentApprove(req, res) {
  const Id = req.params.appointmentId
  const info = await Doctor.findById(Id.doctor)
  if(!info || info.email != req.user.email){
    res.status(401).json({message:`${!info?"No doctor found to approve":"Not authorized doctor to approve "} `})
  }
  const approve = await Appointment.findById(Id)
  approve.status = "Approved";
  await approve.save()



  res.status(200).json({ message: `Appointment Approved By ${req.user.fullName}` })
}
// async function appointmentApprove(req, res) {
//   const Id = req.params.appointmentId

//   const approve = await Appointment.findById(Id)
//   approve.status = "Approved";
//   await approve.save()



//   res.status(200).json({ message: `Appointment Approved By ${req.user.fullName}` })
// }

async function appointmentComplete(req, res) {
  const Id = req.params.appointmentId

  const info = await Doctor.findById(Id.doctor)
  if(!info || info.email != req.user.email){
    res.status(401).json({message:`${!info?"No doctor found to approve":"Not authorized doctor to approve "} `})
  }

  const complete = await Appointment.findById(Id)
  complete.status = "Completed";
  await complete.save()



  res.status(200).json({ message: `Appointment Completed By ${req.user.fullName}` })
}
// async function appointmentComplete(req, res) {
//   const Id = req.params.appointmentId

//   const complete = await Appointment.findById(Id)
//   complete.status = "Completed";
//   await complete.save()



//   res.status(200).json({ message: `Appointment Completed By ${req.user.fullName}` })
// }


module.exports = { appointmentBooking, appointmentCancle, appointmentApprove, appointmentComplete }